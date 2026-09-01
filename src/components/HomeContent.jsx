import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Billboard, Html, useGLTF } from "@react-three/drei";
import { Box3, MeshBasicMaterial, Vector3 } from "three";
import faceUrl from "../assets/MyFaces.glb?url";
import resumeUrl from "../assets/Resume.glb?url";
import resumePdfUrl from "../assets/resume 202609.pdf?url";
import { HOME_CONTENT } from "../homeContent";
import { EARTH_ROTATION_SPEED, EARTH_TILT } from "../spaceConstants";

function makePhotoMaterial(material) {
    const map = material.map ?? material.emissiveMap;
    if (!map) return material;

    const unlit = new MeshBasicMaterial({
        map,
        color: material.color,
        transparent: material.transparent,
        opacity: material.opacity,
        alphaTest: material.alphaTest,
        side: material.side,
    });
    unlit.toneMapped = false;
    return unlit;
}

function NormalizedModel({
    url,
    size,
    position,
    faceCamera,
    unlit = false,
    rotation = [0, 0, 0],
    objectRef,
    onClick,
}) {
    const { scene } = useGLTF(url);
    const model = useMemo(() => {
        const object = scene.clone(true);

        if (unlit) {
            object.traverse((child) => {
                if (!child.isMesh) return;
                child.material = Array.isArray(child.material)
                    ? child.material.map(makePhotoMaterial)
                    : makePhotoMaterial(child.material);
            });
        }

        const bounds = new Box3().setFromObject(object);
        const dimensions = bounds.getSize(new Vector3());
        const center = bounds.getCenter(new Vector3());
        const largestDimension = Math.max(
            dimensions.x,
            dimensions.y,
            dimensions.z,
        );

        return {
            object,
            center: [-center.x, -center.y, -center.z],
            scale: largestDimension > 0 ? size / largestDimension : 1,
        };
    }, [scene, size, unlit]);

    return (
        <Billboard
            ref={objectRef}
            position={position}
            follow={faceCamera}
            rotation={rotation}
        >
            <group
                scale={model.scale}
                rotation={[0, Math.PI / 2, 0]}
                onClick={onClick}
            >
                <primitive object={model.object} position={model.center} />
            </group>
        </Billboard>
    );
}

export default function HomeContent({
    visible,
    faceCamera,
    resumeRef,
    onSelectResume,
    resumeActive,
    onGoHome,
    language,
    onLanguageChange,
}) {
    const orbitRef = useRef();
    const { size } = useThree();
    const compact = size.width < 700;
    const content = HOME_CONTENT[language];

    const openResume = (event) => {
        event.stopPropagation();
        onSelectResume();

        if (window.confirm("Would you like to download Robert's résumé PDF?")) {
            const link = document.createElement("a");
            link.href = resumePdfUrl;
            link.download = "Robert-Barthell-Garay-Resume.pdf";
            link.click();
        }
    };

    useFrame(({ clock }) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y =
                clock.elapsedTime * EARTH_ROTATION_SPEED;
        }
    });

    return (
        <group rotation={[0, 0, -EARTH_TILT]} visible={visible}>
            <group ref={orbitRef}>
                <NormalizedModel
                    url={faceUrl}
                    size={compact ? 1.3 : 2.4}
                    position={compact ? [-1, 1.5, 52] : [-2.5, 0, 35]}
                    faceCamera={faceCamera}
                    unlit
                />
                <NormalizedModel
                    url={content.nameModel}
                    size={(compact ? 1.7 : 2.4) * (content.nameScale ?? 1)}
                    position={compact ? [-0.3, 1.5, 52] : [1.8, 0.9, 35]}
                    faceCamera={faceCamera}
                />
                <NormalizedModel
                    url={content.jobModel}
                    size={compact ? 1.6 : 2.2}
                    position={compact ? [-0.6, -1.6, 52] : [1.8, -0.9, 35]}
                    faceCamera={faceCamera}
                />
                <NormalizedModel
                    url={resumeUrl}
                    size={compact ? 3.2 : 4}
                    position={compact ? [12, 0, 50] : [9.5, 0, 34]}
                    rotation={[0, (Math.PI * 5) / 18, 0]}
                    faceCamera={false}
                    objectRef={resumeRef}
                    onClick={openResume}
                    unlit
                />
                {visible && (faceCamera || resumeActive) && (
                    <Billboard
                        position={
                            resumeActive
                                ? (compact ? [12, -2.4, 50] : [9.5, -2.5, 34])
                                : (compact ? [2.5, -1.2, 52] : [3.4, 0, 35])
                        }
                        follow
                    >
                        <Html center transform distanceFactor={compact ? 1 : 2}>
                            <button
                                className="resume-pointer"
                                type="button"
                                title={resumeActive ? "Go home" : "View résumé"}
                                aria-label={
                                    resumeActive
                                        ? "Return to home view"
                                        : "Turn toward résumé"
                                }
                                onPointerDown={(event) => event.stopPropagation()}
                                onClick={resumeActive ? onGoHome : onSelectResume}
                            >
                                <span aria-hidden="true">
                                    {resumeActive ? "←" : "→"}
                                </span>
                            </button>
                        </Html>
                    </Billboard>
                )}
                {visible && (
                    <Html
                        position={compact ? [0, -1.8, 52] : [1.8, 0, 35]}
                        center
                        transform
                        distanceFactor={compact ? 1 : 2.0}
                    >
                        <section
                            className="home-blurb"
                            onPointerDown={(event) => event.stopPropagation()}
                        >
                            <p>{content.blurb}</p>
                            <div
                                className="language-switcher"
                                role="group"
                                aria-label="Language"
                            >
                                {Object.entries(HOME_CONTENT).map(([code, entry]) => (
                                    <button
                                        type="button"
                                        key={code}
                                        aria-pressed={language === code}
                                        onClick={() => onLanguageChange(code)}
                                    >
                                        {entry.label}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </Html>
                )}
            </group>
        </group>
    );
}

useGLTF.preload(faceUrl);
useGLTF.preload(resumeUrl);
Object.values(HOME_CONTENT).forEach(({ nameModel, jobModel }) => {
    useGLTF.preload(nameModel);
    useGLTF.preload(jobModel);
});

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { Box3, MeshBasicMaterial, Vector3 } from "three";
import claudiusUrl from "../assets/ClaudiusOrbitv2.glb?url";
import remusUrl from "../assets/Remuslowpolywhite.glb?url";
import { EARTH_ROTATION_SPEED, EARTH_TILT } from "../spaceConstants";
import { TRAJECTORY_CONTENT } from "../trajectoryContent";
import { getSolverTranslation } from "../rolamgasTranslations";

const TRAJECTORY_TRANSFORMS = {
    desktop: {
        position: [-4, 0, 38],
        rotation: [0, (4 * Math.PI) / 10, 0],
        scale: 0.65,
    },
    mobile: {
        position: [-2, 0, 54],
        rotation: [0, (2 * Math.PI) / 10, 0],
        scale: 0.35,
    },
};

export function NormalizedTrajectory({ url, position, size = 2.4, rotation = [Math.PI / 2, 0, 0], unlit = false }) {
    const { scene } = useGLTF(url);
    const model = useMemo(() => {
        const object = scene.clone(true);
        if (unlit) object.traverse(child => {
            if (!child.isMesh) return;
            const material = source => new MeshBasicMaterial({
                color: source.emissive && (source.emissive.r + source.emissive.g + source.emissive.b > 0) ? source.emissive : source.color,
                map: source.map, transparent: source.transparent, opacity: source.opacity,
                side: source.side, vertexColors: source.vertexColors, toneMapped: false,
            });
            child.material = Array.isArray(child.material) ? child.material.map(material) : material(child.material);
        });
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
        <group position={position} rotation={rotation}>
            <group scale={model.scale}>
                <primitive object={model.object} position={model.center} />
            </group>
        </group>
    );
}

function MissionPanel({ mission }) {
    return (
        <section className="trajectory-panel">
            <h2>{mission.title}</h2>
            <div className="trajectory-copy">
                {mission.paragraphs.map((paragraph, index) => (
                    <p key={`${mission.title}-paragraph-${index}`}>
                        {paragraph}
                    </p>
                ))}
            </div>
            <div className="trajectory-gallery">
                {mission.images.map((image, index) => (
                    <a
                        href={image}
                        target="_blank"
                        rel="noreferrer"
                        key={image}
                        aria-label={`Open ${mission.title} image ${index + 1}`}
                    >
                        <img src={image} alt="" loading="lazy" />
                    </a>
                ))}
            </div>
        </section>
    );
}

export default function TrajectoryWork({ objectRef, language, onSelectSolver, active }) {
    const orbitRef = useRef();
    const { size } = useThree();
    const compact = size.width < 700;
    const content = TRAJECTORY_CONTENT[language] ?? TRAJECTORY_CONTENT.en;
    const solverText = getSolverTranslation(language);
    const transform = compact
        ? TRAJECTORY_TRANSFORMS.mobile
        : TRAJECTORY_TRANSFORMS.desktop;

    useFrame(({ clock }) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y =
                clock.elapsedTime * EARTH_ROTATION_SPEED;
        }
    });

    return (
        <group rotation={[0, 0, -EARTH_TILT]}>
            <group ref={orbitRef}>
                <group ref={objectRef} {...transform}>
                    {active && <Html
                        position={[0, 4, 0]}
                        center
                        transform
                        distanceFactor={compact ? 2.5 : 2}
                    >
                        <h1 className="trajectory-title">
                            {content.title}
                        </h1>
                    </Html>}
                    <NormalizedTrajectory
                        url={claudiusUrl}
                        position={[-2.2, 2.2, 0]}
                    />
                    <NormalizedTrajectory
                        url={remusUrl}
                        position={[2.2, 2.2, 0]}
                    />
                    {active && <Html
                        position={[-2.2, 0., 0]}
                        center
                        transform
                        distanceFactor={2.5}
                    >
                        <MissionPanel mission={content.claudius} />
                    </Html>}
                    {active && <Html
                        position={[2.2, -0.5, 0]}
                        center
                        transform
                        distanceFactor={3.5}
                    >
                        <MissionPanel mission={content.remus} />
                    </Html>}
                    {active && <Html position={[-1, -2, 0]} center transform distanceFactor={compact ? 3 : 3.5}>
                        <button className="solver-portal" type="button" onClick={onSelectSolver} tabIndex={active ? 0 : -1}>
                            <span className="solver-portal__eyebrow">{solverText.portalLead}</span>
                            <strong>RoLaMGAS <span aria-hidden="true">←</span></strong>
                            <span>{solverText.subtitle}</span>
                            <span className="solver-portal__hint">{solverText.portalHint}</span>
                        </button>
                    </Html>}
                </group>
            </group>
        </group>
    );
}

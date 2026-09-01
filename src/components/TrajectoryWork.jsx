import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import claudiusUrl from "../assets/ClaudiusOrbitv2.glb?url";
import remusUrl from "../assets/RemusOrbitv2.glb?url";
import { EARTH_ROTATION_SPEED, EARTH_TILT } from "../spaceConstants";
import { TRAJECTORY_CONTENT } from "../trajectoryContent";

const HOME_PREVIEW_POSITION = [-4.6, 0, 35];

function NormalizedTrajectory({ url, position, onClick }) {
    const { scene } = useGLTF(url);
    const model = useMemo(() => {
        const object = scene.clone(true);
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
            scale: largestDimension > 0 ? 4.2 / largestDimension : 1,
        };
    }, [scene]);

    return (
        <group
            position={position}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={onClick}
            onPointerOver={
                onClick
                    ? () => { document.body.style.cursor = "pointer"; }
                    : undefined
            }
            onPointerOut={
                onClick
                    ? () => { document.body.style.cursor = "default"; }
                    : undefined
            }
        >
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

export default function TrajectoryWork({ objectRef, showContent, onSelect }) {
    const orbitRef = useRef();
    const { size } = useThree();
    const compact = size.width < 700;

    useFrame(({ clock }) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y =
                clock.elapsedTime * EARTH_ROTATION_SPEED;
        }
    });

    return (
        <group rotation={[0, 0, -EARTH_TILT]}>
            <group ref={orbitRef}>
                {!showContent && (
                    <NormalizedTrajectory
                        url={remusUrl}
                        position={compact ? [-3.2, 0, 52] : HOME_PREVIEW_POSITION}
                        onClick={(event) => {
                            event.stopPropagation();
                            onSelect();
                        }}
                    />
                )}
                {showContent && (
                    <group
                        ref={objectRef}
                        position={compact ? [-15, 0, 65] : [-5, 0, 40]}
                        rotation={[0, Math.PI / 2, 0]}
                    >
                        <Html position={[0, 3.5, 0]} center transform distanceFactor={2}>
                            <h1 className="trajectory-title">
                                {TRAJECTORY_CONTENT.title}
                            </h1>
                        </Html>
                        <NormalizedTrajectory url={claudiusUrl} position={[-3, 0.8, 0]} />
                        <NormalizedTrajectory url={remusUrl} position={[3, 0.8, 0]} />
                        <Html position={[-3, -2.5, 0]} center transform distanceFactor={1.8}>
                            <MissionPanel mission={TRAJECTORY_CONTENT.claudius} />
                        </Html>
                        <Html position={[3, -2.5, 0]} center transform distanceFactor={1.8}>
                            <MissionPanel mission={TRAJECTORY_CONTENT.remus} />
                        </Html>
                    </group>
                )}
            </group>
        </group>
    );
}

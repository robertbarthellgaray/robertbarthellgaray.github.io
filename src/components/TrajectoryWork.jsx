import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import claudiusUrl from "../assets/ClaudiusOrbitv2.glb?url";
import remusUrl from "../assets/Remuslowpolywhite.glb?url";
import { EARTH_ROTATION_SPEED, EARTH_TILT } from "../spaceConstants";
import { TRAJECTORY_CONTENT } from "../trajectoryContent";

const TRAJECTORY_TRANSFORM = {
    position: [-4, 0, 40],
    rotation: [0, 4*Math.PI / 10, 0],
    scale: 0.6,
};

function NormalizedTrajectory({ url, position }) {
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
        <group position={position} rotation={[Math.PI / 2, 0, 0]}>
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

export default function TrajectoryWork({ objectRef, language }) {
    const orbitRef = useRef();
    const { size } = useThree();
    const compact = size.width < 700;
    const content = TRAJECTORY_CONTENT[language] ?? TRAJECTORY_CONTENT.en;
    const transform = compact
        ? {
            position: [-2, 0, 48],
            rotation: TRAJECTORY_TRANSFORM.rotation,
            scale: 0.55,
        }
        : TRAJECTORY_TRANSFORM;

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
                    <Html
                        position={compact ? [0, 3.2, 0] : [0, 3.5, 0]}
                        center
                        transform
                        distanceFactor={compact ? 2.5 : 2}
                    >
                        <h1 className="trajectory-title">
                            {content.title}
                        </h1>
                    </Html>
                    <NormalizedTrajectory
                        url={claudiusUrl}
                        position={compact ? [-1.4, 1.7, 0] : [-3, 0.8, 0]}
                    />
                    <NormalizedTrajectory
                        url={remusUrl}
                        position={compact ? [1.4, 1.7, 0] : [3, 0.8, 0]}
                    />
                    <Html
                        position={compact ? [0, 0, 0] : [-4.5, -1.5, 0]}
                        center
                        transform
                        distanceFactor={compact ? 2.2 : 3.5}
                    >
                        <MissionPanel mission={content.claudius} />
                    </Html>
                    <Html
                        position={compact ? [0, -4.1, 0] : [0.75, -1.5, 0]}
                        center
                        transform
                        distanceFactor={compact ? 2.2 : 3.5}
                    >
                        <MissionPanel mission={content.remus} />
                    </Html>
                </group>
            </group>
        </group>
    );
}

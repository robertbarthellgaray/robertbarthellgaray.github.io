import { startTransition, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import Atmosphere from "./Atmosphere";
import {
    EARTH_RADIUS,
    EARTH_ROTATION_SPEED,
    EARTH_TILT,
    HIGH_RES_TEXTURE_DISTANCE,
} from "../spaceConstants";

const TEXTURE_SETS = {
    portfolio: {
        map: "/textures/earth-2k.jpg",
        normalMap: "/textures/earth-normal-2k.jpg",
        roughnessMap: "/textures/earth-roughness-2k.jpg",
        clouds: "/textures/earth-clouds-2k.jpg",
    },
    leo: {
        map: "/textures/earth.jpg",
        normalMap: "/textures/Earth_NormalNRM_6K.jpg",
        roughnessMap: "/textures/Earth_Rough_6K.png",
        clouds: "/textures/8k_earth_clouds.jpg",
    },
};

export default function Earth({
    quality = "auto",
    highResolutionDistance = HIGH_RES_TEXTURE_DISTANCE,
    onHoverStart,
    onHoverEnd,
}) {
    const earthRef = useRef();
    const cloudsRef = useRef();
    const upgradeStartedRef = useRef(false);
    const [autoQuality, setAutoQuality] = useState("portfolio");
    const activeQuality = quality === "auto" ? autoQuality : quality;

    const textures = useTexture(
        TEXTURE_SETS[activeQuality] ?? TEXTURE_SETS.portfolio,
    );

    useFrame(({ camera, clock }) => {
        const rotation = clock.elapsedTime * EARTH_ROTATION_SPEED;

        if (earthRef.current) {
            earthRef.current.rotation.y = rotation;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = rotation * 1.02;
        }

        if (
            quality === "auto" &&
            autoQuality === "portfolio" &&
            !upgradeStartedRef.current &&
            camera.position.length() <= highResolutionDistance
        ) {
            upgradeStartedRef.current = true;
            startTransition(() => setAutoQuality("leo"));
        }
    });

    return (
        <group rotation={[0, 0, -EARTH_TILT]}>
            <mesh ref={earthRef}>
                <sphereGeometry args={[EARTH_RADIUS, 96, 96]} />
                <meshStandardMaterial
                    map={textures.map}
                    normalMap={textures.normalMap}
                    roughnessMap={textures.roughnessMap}
                    roughness={1}
                    metalness={0}
                />
            </mesh>

            <mesh
                ref={cloudsRef}
                onPointerOver={(event) => {
                    event.stopPropagation();
                    onHoverStart?.();
                }}
                onPointerOut={onHoverEnd}
            >
                <sphereGeometry args={[6.4, 96, 96]} />
                <meshStandardMaterial
                    map={textures.clouds}
                    alphaMap={textures.clouds}
                    transparent
                    opacity={0.96}
                    depthWrite={false}
                />
            </mesh>

            <Atmosphere />
        </group>
    );
}

import { startTransition, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import Atmosphere from "./Atmosphere";

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

export default function Earth({ quality = "auto", highResolutionDistance = 3 }) {
    const earthRef = useRef();
    const cloudsRef = useRef();
    const upgradeStartedRef = useRef(false);
    const [autoQuality, setAutoQuality] = useState("portfolio");
    const activeQuality = quality === "auto" ? autoQuality : quality;

    const textures = useTexture(
        TEXTURE_SETS[activeQuality] ?? TEXTURE_SETS.portfolio,
    );

    useFrame(({ camera }, delta) => {
        if (earthRef.current) earthRef.current.rotation.y += delta * 0.05;
        if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.06;

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
        <group rotation={[0, 0, -0.41]}>
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 96, 96]} />
                <meshStandardMaterial
                    map={textures.map}
                    normalMap={textures.normalMap}
                    roughnessMap={textures.roughnessMap}
                    roughness={1}
                    metalness={0}
                />
            </mesh>

            <mesh ref={cloudsRef}>
                <sphereGeometry args={[1.008, 96, 96]} />
                <meshStandardMaterial
                    map={textures.clouds}
                    alphaMap={textures.clouds}
                    transparent
                    opacity={0.32}
                    depthWrite={false}
                />
            </mesh>

            <Atmosphere />
        </group>
    );
}

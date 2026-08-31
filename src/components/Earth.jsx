import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import Atmosphere from "./Atmosphere";

export default function Earth() {
    const earthRef = useRef();
    const cloudsRef = useRef();

    // Load textures from public/textures/
    const textures = useTexture({
        map: "/textures/earth.jpg",
        normalMap: "/textures/Earth_NormalNRM_6K.jpg",
        roughnessMap: "/textures/Earth_Rough_6K.png",
        clouds: "/textures/8k_earth_clouds.jpg",
    });

    useFrame((_, delta) => {
        if (earthRef.current) earthRef.current.rotation.y += delta * 0.05;
        if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.06;
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

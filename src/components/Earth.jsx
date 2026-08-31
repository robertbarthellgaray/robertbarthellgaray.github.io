import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { AdditiveBlending, BackSide } from "three";

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
                    roughness={0.8}
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

            <mesh scale={1.06}>
                <sphereGeometry args={[1, 96, 96]} />
                <meshBasicMaterial
                    color="#4da6ff"
                    transparent
                    opacity={0.09}
                    side={BackSide}
                    blending={AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

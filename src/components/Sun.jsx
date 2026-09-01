import { AdditiveBlending } from "three";

const SUN_POSITION = [490, 294, 490];

export default function Sun({ visible = true }) {
    return (
        <group position={SUN_POSITION} visible={visible}>
            <mesh>
                <sphereGeometry args={[4, 32, 32]} />
                <meshBasicMaterial color="#fff7d1" toneMapped={false} />
            </mesh>
            <mesh>
                <sphereGeometry args={[7, 32, 32]} />
                <meshBasicMaterial
                    color="#ffd36a"
                    transparent
                    opacity={0.14}
                    depthWrite={false}
                    blending={AdditiveBlending}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}

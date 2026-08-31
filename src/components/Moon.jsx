import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const MOON_ORBIT_RADIUS = 384.4;
const MOON_RADIUS = 1.737;
const MOON_ORBIT_SPEED = (Math.PI * 2) / (28 * 60);

export default function Moon() {
    const orbitRef = useRef();

    useFrame((_, delta) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y += delta * MOON_ORBIT_SPEED;
        }
    });

    return (
        <group rotation={[MathUtils.degToRad(5.14), 0, 0]}>
            <group ref={orbitRef}>
                <mesh position={[MOON_ORBIT_RADIUS, 0, 0]}>
                    <sphereGeometry args={[MOON_RADIUS, 48, 48]} />
                    <meshStandardMaterial color="#9da1a6" roughness={1} />
                </mesh>
            </group>
        </group>
    );
}

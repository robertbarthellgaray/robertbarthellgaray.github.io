import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { SIMULATION_TIME_SCALE } from "../spaceConstants";

const MOON_ORBIT_RADIUS = 384.4;
const MOON_RADIUS = 1.737;
const MOON_ORBIT_SPEED =
    (Math.PI * 2 * SIMULATION_TIME_SCALE) / (28 * 86400);

export default function Moon() {
    const orbitRef = useRef();

    useFrame(({ clock }) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y = clock.elapsedTime * MOON_ORBIT_SPEED;
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

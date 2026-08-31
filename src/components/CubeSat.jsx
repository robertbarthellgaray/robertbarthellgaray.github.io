import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { EARTH_RADIUS, EARTH_TILT, SCENE_UNIT_KM } from "../spaceConstants";

const ORBIT_ALTITUDE_KM = 400;
const ORBIT_RADIUS = EARTH_RADIUS + ORBIT_ALTITUDE_KM / SCENE_UNIT_KM;
const ORBIT_RADIUS_KM = ORBIT_RADIUS * SCENE_UNIT_KM;
const EARTH_GRAVITATIONAL_PARAMETER = 398600.4418;
const ORBIT_SPEED = Math.sqrt(
    EARTH_GRAVITATIONAL_PARAMETER / ORBIT_RADIUS_KM ** 3,
);

export default function CubeSat() {
    const orbitRef = useRef();

    useFrame((_, delta) => {
        if (orbitRef.current) orbitRef.current.rotation.y += delta * ORBIT_SPEED;
    });

    return (
        <group rotation={[0, 0, -EARTH_TILT]}>
            <group rotation={[MathUtils.degToRad(51), 0, 0]}>
                <group ref={orbitRef}>
                    <mesh position={[ORBIT_RADIUS, 0, 0]}>
                        <boxGeometry args={[0.08, 0.08, 0.08]} />
                        <meshStandardMaterial color="white" />
                    </mesh>
                </group>
            </group>
        </group>
    );
}

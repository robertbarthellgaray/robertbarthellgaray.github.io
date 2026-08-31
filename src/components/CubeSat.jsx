import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, MathUtils, Vector3 } from "three";
import {
    CUBESAT_TIME_SCALE,
    EARTH_RADIUS,
    EARTH_TILT,
    SCENE_UNIT_KM,
} from "../spaceConstants";

const ORBIT_ALTITUDE_KM = 400;
const ORBIT_RADIUS = EARTH_RADIUS + ORBIT_ALTITUDE_KM / SCENE_UNIT_KM;
const ORBIT_RADIUS_KM = ORBIT_RADIUS * SCENE_UNIT_KM;
const EARTH_GRAVITATIONAL_PARAMETER = 398600.4418;
const ORBIT_SPEED = Math.sqrt(
    EARTH_GRAVITATIONAL_PARAMETER / ORBIT_RADIUS_KM ** 3,
);
const DISPLAY_SIZE = 0.08;

function DefaultCubeSat() {
    return (
        <mesh>
            <boxGeometry args={[DISPLAY_SIZE, DISPLAY_SIZE, DISPLAY_SIZE]} />
            <meshStandardMaterial color="white" />
        </mesh>
    );
}

function CubeSatModel({ url }) {
    const { scene } = useGLTF(url);
    const model = useMemo(() => {
        const object = scene.clone(true);
        const bounds = new Box3().setFromObject(object);
        const size = bounds.getSize(new Vector3());
        const center = bounds.getCenter(new Vector3());
        const largestDimension = Math.max(size.x, size.y, size.z);

        object.position.sub(center);
        return {
            object,
            scale: largestDimension > 0 ? DISPLAY_SIZE / largestDimension : 1,
        };
    }, [scene]);

    return <primitive object={model.object} scale={model.scale} />;
}

export default function CubeSat({
    modelUrl = null,
    timeScale = CUBESAT_TIME_SCALE,
}) {
    const orbitRef = useRef();

    useFrame((_, delta) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y += delta * ORBIT_SPEED * timeScale;
        }
    });

    return (
        <group rotation={[0, 0, -EARTH_TILT]}>
            <group rotation={[MathUtils.degToRad(51), 0, 0]}>
                <group ref={orbitRef}>
                    <group position={[ORBIT_RADIUS, 0, 0]}>
                        <Suspense fallback={<DefaultCubeSat />}>
                            {modelUrl ? (
                                <CubeSatModel url={modelUrl} />
                            ) : (
                                <DefaultCubeSat />
                            )}
                        </Suspense>
                    </group>
                </group>
            </group>
        </group>
    );
}

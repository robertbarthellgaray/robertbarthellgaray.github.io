import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { AdditiveBlending, Box3, MathUtils, Vector3 } from "three";
import {
    EARTH_RADIUS,
    EARTH_TILT,
    SCENE_UNIT_KM,
    SIMULATION_TIME_SCALE,
} from "../spaceConstants";

const ORBIT_ALTITUDE_KM = 400;
const ORBIT_RADIUS = EARTH_RADIUS + ORBIT_ALTITUDE_KM / SCENE_UNIT_KM;
const ORBIT_RADIUS_KM = ORBIT_RADIUS * SCENE_UNIT_KM;
const EARTH_GRAVITATIONAL_PARAMETER = 398600.4418;
const ORBIT_SPEED = Math.sqrt(
    EARTH_GRAVITATIONAL_PARAMETER / ORBIT_RADIUS_KM ** 3,
);
const DISPLAY_SIZE = 0.08;

function ThrusterFlame({ position, color, radius, length, phase }) {
    const flameRef = useRef();

    useFrame(({ clock }) => {
        if (!flameRef.current) return;
        const flicker = 0.88 + Math.sin(clock.elapsedTime * 28 + phase) * 0.12;
        flameRef.current.scale.y = flicker;
        flameRef.current.material.opacity = 0.62 + flicker * 0.22;
    });

    return (
        <group position={position} rotation={[Math.PI / 2, 0, 0]}>
            <mesh ref={flameRef} position={[0, -length / 2, 0]}>
                <coneGeometry args={[radius, length, 16, 1, true]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.8}
                    depthWrite={false}
                    blending={AdditiveBlending}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}

function ThrusterExhaust() {
    return (
        <>
            <ThrusterFlame
                position={[0, 0, 0]}
                color="#ffffff"
                radius={0.13}
                length={0.8}
                phase={0}
            />
            <ThrusterFlame
                position={[-0.7, 0, 0]}
                color="#55aaff"
                radius={0.08}
                length={0.5}
                phase={1.8}
            />
            <ThrusterFlame
                position={[0.7, 0, 0]}
                color="#55aaff"
                radius={0.08}
                length={0.5}
                phase={3.6}
            />
        </>
    );
}

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

        return {
            object,
            center: [-center.x, -center.y, -center.z],
            scale: largestDimension > 0 ? DISPLAY_SIZE / largestDimension : 1,
        };
    }, [scene]);

    return (
        <group scale={model.scale}>
            <group position={model.center}>
                <primitive object={model.object} />
                <ThrusterExhaust />
            </group>
        </group>
    );
}

export default function CubeSat({
    modelUrl = null,
    timeScale = SIMULATION_TIME_SCALE,
    objectRef,
    onSelect,
    showLabel = false,
}) {
    const orbitRef = useRef();

    useFrame(({ clock }) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y =
                clock.elapsedTime * ORBIT_SPEED * timeScale;
        }
    });

    const selectCubeSat = (event) => {
        event.stopPropagation();
        onSelect?.();
    };

    return (
        <group rotation={[0, 0, -EARTH_TILT]}>
            <group rotation={[MathUtils.degToRad(51), 0, 0]}>
                <group ref={orbitRef}>
                    <group
                        ref={objectRef}
                        position={[ORBIT_RADIUS, 0, 0]}
                        onClick={selectCubeSat}
                        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
                        onPointerOut={() => { document.body.style.cursor = "default"; }}
                    >
                        <Suspense fallback={<DefaultCubeSat />}>
                            {modelUrl ? (
                                <CubeSatModel url={modelUrl} />
                            ) : (
                                <DefaultCubeSat />
                            )}
                        </Suspense>
                        {showLabel && (
                            <Html position={[0.12, 0.1, 0]} center>
                                <section className="cubesat-blurb">
                                    <strong>CubeSat</strong>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Integer vitae justo sed
                                        sapien luctus cursus.
                                    </p>
                                </section>
                            </Html>
                        )}
                    </group>
                </group>
            </group>
        </group>
    );
}

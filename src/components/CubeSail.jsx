import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { Box3, MathUtils, Vector3 } from "three";
import sailModelUrl from "../assets/saildummyv2.glb?url";
import { CUBESAIL_CONTENT } from "../cubeSatContent";
import {
    EARTH_RADIUS,
    EARTH_TILT,
    SCENE_UNIT_KM,
    SIMULATION_TIME_SCALE,
} from "../spaceConstants";
import { SUN_POSITION } from "../sceneConstants";

const ORBIT_ALTITUDE_KM = 750;
const ORBIT_RADIUS = EARTH_RADIUS + ORBIT_ALTITUDE_KM / SCENE_UNIT_KM;
const ORBIT_RADIUS_KM = ORBIT_RADIUS * SCENE_UNIT_KM;
const ORBIT_SPEED = Math.sqrt(398600.4418 / ORBIT_RADIUS_KM ** 3);
const DISPLAY_SIZE = 0.22;
const SUN_WORLD_POSITION = new Vector3(...SUN_POSITION);

function SailModel() {
    const { scene } = useGLTF(sailModelUrl);
    const sailRef = useRef();
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

    useFrame(() => {
        sailRef.current?.lookAt(SUN_WORLD_POSITION);
    });

    return (
        <group ref={sailRef} scale={model.scale}>
            <primitive object={model.object} position={model.center} />
        </group>
    );
}

export default function CubeSail({ objectRef, onSelect, language }) {
    const orbitRef = useRef();
    const content = CUBESAIL_CONTENT[language] ?? CUBESAIL_CONTENT.en;

    useFrame(({ clock }) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y =
                Math.PI + clock.elapsedTime * ORBIT_SPEED * SIMULATION_TIME_SCALE;
        }
    });

    return (
        <group rotation={[0, 0, -EARTH_TILT]}>
            <group rotation={[MathUtils.degToRad(97.7), 0, 0]}>
                <group ref={orbitRef}>
                    <group
                        ref={objectRef}
                        position={[ORBIT_RADIUS, 0, 0]}
                        onClick={(event) => {
                            event.stopPropagation();
                            onSelect?.();
                        }}
                        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
                        onPointerOut={() => { document.body.style.cursor = "default"; }}
                    >
                        <SailModel />
                        <Html
                            position={[0, 0.18, 0]}
                            center
                            transform
                            sprite
                            distanceFactor={0.35}
                        >
                            <section className="cubesat-blurb">
                                <strong>{content.title}</strong>
                                {content.paragraphs.map((paragraph, index) => (
                                    <p key={`cubesail-paragraph-${index}`}>
                                        {paragraph}
                                    </p>
                                ))}
                            </section>
                        </Html>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload(sailModelUrl);

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Html, useTexture } from "@react-three/drei";
import { MathUtils, SRGBColorSpace } from "three";
import { SIMULATION_TIME_SCALE } from "../spaceConstants";

// Add the image to public/textures, then set this to "/textures/moon.jpg".
const MOON_TEXTURE_URL = null;

const MOON_ORBIT_RADIUS = 384.4;
const MOON_RADIUS = 1.737;
const MOON_ORBIT_SPEED =
    (Math.PI * 2 * SIMULATION_TIME_SCALE) / (28 * 86400);

function MoonMaterial({ textureUrl }) {
    const texture = useTexture(textureUrl);
    const colorTexture = useMemo(() => {
        const copy = texture.clone();
        copy.colorSpace = SRGBColorSpace;
        copy.needsUpdate = true;
        return copy;
    }, [texture]);

    return <meshStandardMaterial map={colorTexture} roughness={1} />;
}

export default function Moon({ objectRef, panelRef, onSelect, showContent }) {
    const orbitRef = useRef();

    useFrame(({ clock }) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y = clock.elapsedTime * MOON_ORBIT_SPEED;
        }
    });

    return (
        <group rotation={[MathUtils.degToRad(5.14), 0, 0]}>
            <group ref={orbitRef}>
                <group ref={objectRef} position={[MOON_ORBIT_RADIUS, 0, 0]}>
                    <mesh
                        onClick={(event) => {
                            event.stopPropagation();
                            onSelect?.();
                        }}
                        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
                        onPointerOut={() => { document.body.style.cursor = "default"; }}
                    >
                        <sphereGeometry args={[MOON_RADIUS, 48, 48]} />
                        {MOON_TEXTURE_URL ? (
                            <MoonMaterial textureUrl={MOON_TEXTURE_URL} />
                        ) : (
                            <meshStandardMaterial color="#9da1a6" roughness={1} />
                        )}
                    </mesh>
                    <Billboard ref={panelRef} position={[0, 0, -3.4]} follow>
                        {showContent && (
                            <Html center transform distanceFactor={2.2}>
                                <section className="moon-blurb">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Integer vitae justo sed
                                        sapien luctus cursus. Donec vel sem at
                                        ligula volutpat facilisis.
                                    </p>
                                </section>
                            </Html>
                        )}
                    </Billboard>
                </group>
            </group>
        </group>
    );
}

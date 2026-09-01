import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Html, useTexture } from "@react-three/drei";
import { MathUtils, SRGBColorSpace } from "three";
import { SIMULATION_TIME_SCALE } from "../spaceConstants";
import { MOON_CONTENT } from "../moonContent";

// Add the image to public/textures, then set this to "/textures/moon.jpg".
const MOON_TEXTURE_URL = "/textures/moon.jpg";

const MOON_ORBIT_RADIUS = 384.4;
const MOON_RADIUS = 1.737;
const MOON_ORBIT_SPEED =
    (Math.PI * 2 * SIMULATION_TIME_SCALE) / (28 * 86400);

function getMediaUrl({ provider, id }) {
    if (provider === "bilibili") {
        return `https://player.bilibili.com/player.html?bvid=${id}&poster=1&autoplay=0`;
    }

    return `https://www.youtube-nocookie.com/embed/videoseries?list=${id}`;
}

function getMediaLink({ provider, id }) {
    if (provider === "bilibili") {
        return `https://www.bilibili.com/video/${id}/`;
    }

    return `https://www.youtube.com/playlist?list=${id}`;
}

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

export default function Moon({
    objectRef,
    panelRef,
    onSelect,
    showContent,
    language,
}) {
    const orbitRef = useRef();
    const content = MOON_CONTENT[language] ?? MOON_CONTENT.en;

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
                        rotation={[0, Math.PI, 0]}
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
                    <Billboard ref={panelRef} position={[0, 0, 3.4]} follow>
                        {showContent && (
                            <Html center transform distanceFactor={2.2}>
                                <section className="moon-blurb">
                                    <p>
                                        {content.blurb}
                                    </p>
                                </section>
                            </Html>
                        )}
                    </Billboard>
                    {showContent && content.media.map((entry, index) => (
                        <Billboard
                            key={`${entry.provider}-${entry.id}`}
                            position={[-1.8, (1 - index) * 1.05, 0]}
                            follow
                        >
                            <Html
                                center
                                transform
                                distanceFactor={1.5}
                                onPointerDown={(event) => event.stopPropagation()}
                            >
                                <div className="moon-playlist-row">
                                    <div className="moon-playlist-title">
                                        <a
                                            href={getMediaLink(entry)}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {entry.title}
                                        </a>
                                        <p>{entry.description}</p>
                                    </div>
                                    <iframe
                                        className="moon-playlist"
                                        src={getMediaUrl(entry)}
                                        title={entry.title || `Moon media ${index + 1}`}
                                        loading="lazy"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                </div>
                            </Html>
                        </Billboard>
                    ))}
                </group>
            </group>
        </group>
    );
}

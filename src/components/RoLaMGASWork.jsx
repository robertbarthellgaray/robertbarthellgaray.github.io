import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { EARTH_ROTATION_SPEED, EARTH_TILT } from "../spaceConstants";
import { SOLVER_EXHIBITS, SOLVER_GALLERY } from "../rolamgasContent";
import { NormalizedTrajectory } from "./TrajectoryWork";

function RoutePreview({ data, position, size }) {
    const routes = useMemo(() => {
        const bounds = new Box3();
        data.paths.forEach(path => path.points.forEach(p => bounds.expandByPoint(new Vector3(...p))));
        const center = bounds.getCenter(new Vector3());
        const extent = bounds.getSize(new Vector3());
        const scale = size / Math.max(extent.x, extent.y, extent.z);
        const normalized = p => [ (p[0] - center.x) * scale, (p[1] - center.y) * scale, (p[2] - center.z) * scale ];
        return { paths: data.paths.map(p => p.points.map(normalized)), sun: normalized([0, 0, 0]) };
    }, [data, size]);
    return <group position={position}>
        {routes.paths.map((points, i) => <Line key={i} points={points} color={i % 2 ? "#ffd08a" : "#79d8f1"} lineWidth={1.7} />)}
        <mesh position={routes.sun}><sphereGeometry args={[0.035, 12, 12]} /><meshBasicMaterial color="#ffd08a" /></mesh>
    </group>;
}

function MethodNotes() {
    return <details className="solver-method">
        <summary>How does the solver work?</summary>
        <ol>
            <li><strong>Find the planets.</strong> Cached JPL Horizons positions and velocities give the destination states at candidate encounter dates.</li>
            <li><strong>Connect the dates.</strong> Lambert’s problem gives Sun-centered transfer arcs. The search varies encounter dates, revolution branches and optional deep-space maneuvers.</li>
            <li><strong>Check each assist.</strong> Incoming and outgoing V∞ magnitudes must match for an unpowered flyby, and the required turn must fit above the minimum periapsis.</li>
            <li><strong>Choose the tradeoff.</strong> Compare launch energy, cruise burns, flight time and arrival speed. Refine a favorite locally; finite-radius exports report additional corrections separately.</li>
        </ol>
        <p>C3 is departure V∞ squared. DSM means deep-space maneuver; “dv” marks one in a sequence. E = Earth, V = Venus, Me = Mercury, J = Jupiter, S = Saturn, U = Uranus.</p>
        <p>Zero designed DSM does not mean zero mission propellant: launch injection, navigation corrections and terminal capture require separate budgets.</p>
    </details>;
}

export default function RoLaMGASWork({ objectRef, active }) {
    const orbitRef = useRef();
    const { size } = useThree();
    const compact = size.width < 700;
    const [selected, setSelected] = useState(0);
    const exhibit = SOLVER_EXHIBITS[selected];
    useFrame(({ clock }) => {
        if (orbitRef.current) orbitRef.current.rotation.y = clock.elapsedTime * EARTH_ROTATION_SPEED;
    });
    return <group rotation={[0, 0, -EARTH_TILT]}>
        <group ref={orbitRef}>
            <group ref={objectRef} position={compact ? [-10, 0, 51] : [-12, 0.6, 43]} rotation={[0, compact ? 0.655 : 1.654, 0]}>
                {active && <Html position={[0, compact ? 4.1 : 3.5, 0]} center transform distanceFactor={compact ? 4.5 : 4}>
                    <header className="solver-room-heading">
                        <span>ROBERT’S MISSION DESIGN LAB</span>
                        <h1>RoLaMGAS</h1>
                        <p>Robert’s Lambert Multi Gravity Assist Solver</p>
                        {compact && <div className="solver-mobile-selector" role="group" aria-label="Choose a trajectory exhibit">
                            {SOLVER_EXHIBITS.map((item, i) => <button type="button" key={item.id} aria-pressed={selected === i} onClick={() => setSelected(i)}>{item.title}</button>)}
                        </div>}
                    </header>
                </Html>}
                {SOLVER_EXHIBITS.map((item, i) => {
                    if (compact && selected !== i) return null;
                    const position = compact ? [0, 1.1, 0] : [(i - 1.5) * 3, 1.35, 0];
                    return <group key={item.id}>
                        {item.modelUrl ? <NormalizedTrajectory url={item.modelUrl} position={position} size={compact ? 3.2 : 2.65} unlit /> : <RoutePreview data={item.preview} position={position} size={compact ? 3.2 : 2.65} />}
                        {active && !compact && <Html position={[position[0], -0.65, 0]} center transform distanceFactor={4}>
                            <button className="solver-exhibit-label" type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>
                                <span>{item.category}</span><strong>{item.title}</strong><small>{item.route} <span aria-hidden="true">↗</span></small>
                            </button>
                        </Html>}
                    </group>;
                })}
                {active && <Html position={[0, compact ? -2.5 : -2.3, 0]} center transform distanceFactor={compact ? 4.5 : 4}>
                    <section className="solver-info" aria-label="Selected trajectory and solver explanation" onPointerDown={e => e.stopPropagation()}>
                        <div className="solver-info__mission" aria-live="polite" key={exhibit.id}>
                            <p className="solver-eyebrow">{exhibit.category} · {exhibit.id}</p>
                            <h2>{exhibit.title}</h2><p className="solver-dates">{exhibit.dates}</p>
                            <p>{exhibit.description}</p>
                            {exhibit.metrics && <dl className="solver-metrics">{exhibit.metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
                            <p className="solver-model-note">{exhibit.note}</p>
                        </div>
                        <div className="solver-info__actions">
                            <a className="solver-gallery-button" href={`${SOLVER_GALLERY}#mission=${exhibit.id}`} target="_blank" rel="noreferrer">Explore this trajectory <span aria-hidden="true">↗</span></a>
                            <p className="solver-download-hint">Open its gallery page to download CSV / XYZV states and inspect encounter dates.</p>
                            <MethodNotes />
                            <a className="solver-source-link" href="https://github.com/robertbarthellgaray/RoLaMGAS" target="_blank" rel="noreferrer">Source code & desktop solver ↗</a>
                        </div>
                    </section>
                </Html>}
            </group>
        </group>
    </group>;
}

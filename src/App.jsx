import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "./components/Earth";
import Moon from "./components/Moon";
import LoadingScreen from "./components/LoadingScreen";

const EARTH_TILT = 0.41;

function CubeSat() {
  return (
    <mesh position={[7.2, 0, 0]}>
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function CameraControls({ homeMode }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (!homeMode || !controlsRef.current) return;

    camera.position.set(0, 0, 42);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  }, [camera, homeMode]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableRotate={!homeMode}
      enableZoom={!homeMode}
      enableDamping
      autoRotate={homeMode}
      autoRotateSpeed={-1}
      minDistance={6.6}
      maxDistance={450}
    />
  );
}

export default function App() {
  const [homeMode, setHomeMode] = useState(true);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas
        camera={{ position: [0, 0, 42], fov: 40 }}
        gl={{ alpha: false }}
        onCreated={({ camera }) => {
          camera.up.set(Math.sin(EARTH_TILT), Math.cos(EARTH_TILT), 0);
        }}
      >
        <color attach="background" args={["#000000"]} />
        {/* Dim ambient light */}
        <ambientLight intensity={0.3} />

        {/* Sun */}
        <directionalLight
          position={[5, 3, 5]}
          intensity={30}
        />

        <Suspense fallback={null}>
          <Earth quality="auto" highResolutionDistance={8} />
        </Suspense>

        <Moon />

        {/* CubeSat */}
        <CubeSat />

        <CameraControls homeMode={homeMode} />
      </Canvas>
      <button
        className="view-mode-button"
        type="button"
        aria-pressed={!homeMode}
        onClick={() => setHomeMode((atHome) => !atHome)}
      >
        {homeMode ? "Free view" : "Go Home"}
      </button>
      <LoadingScreen />
    </div>
  );
}

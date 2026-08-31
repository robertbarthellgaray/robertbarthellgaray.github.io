import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import Earth from "./components/Earth";
import Moon from "./components/Moon";
import CubeSat from "./components/CubeSat";
import LoadingScreen from "./components/LoadingScreen";
import { EARTH_ROTATION_SPEED, EARTH_TILT } from "./spaceConstants";

const Y_AXIS = new Vector3(0, 1, 0);
const Z_AXIS = new Vector3(0, 0, 1);

function CameraControls({ homeMode }) {
  const controlsRef = useRef();
  const homePositionRef = useRef(new Vector3());
  const { camera, clock } = useThree();

  useEffect(() => {
    if (!homeMode || !controlsRef.current) return;

    const earthRotation = clock.elapsedTime * EARTH_ROTATION_SPEED;
    homePositionRef.current
      .set(0, 0, 42)
      .applyAxisAngle(Y_AXIS, earthRotation)
      .applyAxisAngle(Z_AXIS, -EARTH_TILT);

    camera.position.copy(homePositionRef.current);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  }, [camera, clock, homeMode]);

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
  const [cubeSatModelUrl, setCubeSatModelUrl] = useState(null);
  const cubeSatModelUrlRef = useRef(null);

  useEffect(() => () => {
    if (cubeSatModelUrlRef.current) {
      URL.revokeObjectURL(cubeSatModelUrlRef.current);
    }
  }, []);

  const loadCubeSatModel = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (cubeSatModelUrlRef.current) {
      URL.revokeObjectURL(cubeSatModelUrlRef.current);
    }
    const modelUrl = URL.createObjectURL(file);
    cubeSatModelUrlRef.current = modelUrl;
    setCubeSatModelUrl(modelUrl);
    event.target.value = "";
  };

  const useDefaultCubeSat = () => {
    if (cubeSatModelUrlRef.current) {
      URL.revokeObjectURL(cubeSatModelUrlRef.current);
      cubeSatModelUrlRef.current = null;
    }
    setCubeSatModelUrl(null);
  };

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
          <Earth quality="auto" />
        </Suspense>

        <Moon />

        {/* CubeSat */}
        <CubeSat modelUrl={cubeSatModelUrl} />

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
      <div className="model-controls">
        <label className="model-control-button">
          Load CubeSat GLB
          <input
            type="file"
            accept=".glb,model/gltf-binary"
            onChange={loadCubeSatModel}
          />
        </label>
        {cubeSatModelUrl && (
          <button
            className="model-control-button"
            type="button"
            onClick={useDefaultCubeSat}
          >
            Use default
          </button>
        )}
      </div>
      <LoadingScreen />
    </div>
  );
}

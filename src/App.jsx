import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Quaternion, Vector3 } from "three";
import Earth from "./components/Earth";
import Moon from "./components/Moon";
import CubeSat from "./components/CubeSat";
import HomeContent from "./components/HomeContent";
import LoadingScreen from "./components/LoadingScreen";
import {
  CUBESAT_MODEL_URL,
  EARTH_ROTATION_SPEED,
  EARTH_TILT,
} from "./spaceConstants";

const Y_AXIS = new Vector3(0, 1, 0);
const Z_AXIS = new Vector3(0, 0, 1);

function CameraControls({ mode, cubeSatRef, resumeRef }) {
  const controlsRef = useRef();
  const homePositionRef = useRef(new Vector3());
  const targetRef = useRef(new Vector3());
  const offsetRef = useRef(new Vector3());
  const previousTargetRef = useRef(new Vector3());
  const resumeNormalRef = useRef(new Vector3());
  const resumeQuaternionRef = useRef(new Quaternion());
  const lastModeRef = useRef(mode);
  const { camera, clock, size } = useThree();

  useFrame(() => {
    if (!controlsRef.current) return;

    if (mode === "home") {
      const earthRotation = clock.elapsedTime * EARTH_ROTATION_SPEED;
      homePositionRef.current
        .set(0, 0, size.width < 700 ? 60 : 42)
        .applyAxisAngle(Y_AXIS, earthRotation)
        .applyAxisAngle(Z_AXIS, -EARTH_TILT);

      camera.position.copy(homePositionRef.current);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }

    if (mode === "cubesat" && cubeSatRef.current) {
      cubeSatRef.current.getWorldPosition(targetRef.current);

      if (lastModeRef.current !== "cubesat") {
        offsetRef.current.copy(targetRef.current).normalize().multiplyScalar(0.5);
        camera.position
          .copy(targetRef.current)
          .add(offsetRef.current)
          .addScaledVector(camera.up, 0.15);
      } else {
        offsetRef.current
          .copy(targetRef.current)
          .sub(previousTargetRef.current);
        camera.position.add(offsetRef.current);
      }

      controlsRef.current.target.copy(targetRef.current);
      previousTargetRef.current.copy(targetRef.current);
      controlsRef.current.update();
    }

    if (mode === "resume" && resumeRef.current) {
      resumeRef.current.getWorldPosition(targetRef.current);
      resumeRef.current.getWorldQuaternion(resumeQuaternionRef.current);
      resumeNormalRef.current
        .set(0, 0, -1)
        .applyQuaternion(resumeQuaternionRef.current)
        .multiplyScalar(8);

      camera.position.copy(targetRef.current).add(resumeNormalRef.current);
      controlsRef.current.target.copy(targetRef.current);
      controlsRef.current.update();
    }

    lastModeRef.current = mode;
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableRotate={mode === "free" || mode === "cubesat"}
      enableZoom={mode === "free" || mode === "cubesat"}
      enableDamping
      minDistance={mode === "cubesat" ? 0.1 : 6.6}
      maxDistance={mode === "cubesat" ? 3 : 450}
    />
  );
}

export default function App() {
  const [cameraMode, setCameraMode] = useState("home");
  const cubeSatRef = useRef();
  const resumeRef = useRef();

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

        <Suspense fallback={null}>
          <HomeContent
            visible={cameraMode !== "cubesat"}
            faceCamera={cameraMode === "home"}
            resumeRef={resumeRef}
            onSelectResume={() => setCameraMode("resume")}
          />
        </Suspense>

        {/* CubeSat */}
        <CubeSat
          modelUrl={CUBESAT_MODEL_URL}
          objectRef={cubeSatRef}
          onSelect={() => setCameraMode("cubesat")}
          showLabel={cameraMode === "cubesat"}
        />

        <CameraControls
          mode={cameraMode}
          cubeSatRef={cubeSatRef}
          resumeRef={resumeRef}
        />
      </Canvas>
      <div className="view-mode-controls" role="group" aria-label="Camera view">
        {["home", "free", "cubesat", "resume"].map((mode) => (
          <button
            className="view-mode-button"
            type="button"
            key={mode}
            aria-pressed={cameraMode === mode}
            onClick={() => setCameraMode(mode)}
          >
            {mode === "cubesat" ? "CubeSat" : mode[0].toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>
      <LoadingScreen />
    </div>
  );
}

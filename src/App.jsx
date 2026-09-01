import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import Earth from "./components/Earth";
import Moon from "./components/Moon";
import CubeSat from "./components/CubeSat";
import HomeContent from "./components/HomeContent";
import LoadingScreen from "./components/LoadingScreen";
import Sun from "./components/Sun";
import TrajectoryWork from "./components/TrajectoryWork";
import {
  CUBESAT_MODEL_URL,
  EARTH_ROTATION_SPEED,
  EARTH_TILT,
} from "./spaceConstants";

const Y_AXIS = new Vector3(0, 1, 0);
const Z_AXIS = new Vector3(0, 0, 1);

function CameraControls({
  mode,
  cubeSatRef,
  resumeRef,
  moonRef,
  moonPanelRef,
  trajectoryRef,
}) {
  const controlsRef = useRef();
  const homePositionRef = useRef(new Vector3());
  const targetRef = useRef(new Vector3());
  const offsetRef = useRef(new Vector3());
  const previousTargetRef = useRef(new Vector3());
  const desiredCameraRef = useRef(new Vector3());
  const desiredTargetRef = useRef(new Vector3());
  const moonPanelPositionRef = useRef(new Vector3());
  const moonRadialRef = useRef(new Vector3());
  const transitionTimeRef = useRef(0);
  const lastModeRef = useRef(mode);
  const { camera, clock, size } = useThree();

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    const modeChanged = lastModeRef.current !== mode;
    let targetReady = false;
    if (modeChanged) transitionTimeRef.current = 0;

    if (mode === "home" || mode === "resume" || mode === "trajectory") {
      const earthRotation = clock.elapsedTime * EARTH_ROTATION_SPEED;
      homePositionRef.current
        .set(0, 0, size.width < 700 ? 60 : 42)
        .applyAxisAngle(Y_AXIS, earthRotation)
        .applyAxisAngle(Z_AXIS, -EARTH_TILT);

      desiredCameraRef.current.copy(homePositionRef.current);
      if (mode === "resume" && resumeRef.current) {
        resumeRef.current.getWorldPosition(desiredTargetRef.current);
        targetReady = true;
      } else if (mode === "trajectory" && trajectoryRef.current) {
        trajectoryRef.current.getWorldPosition(desiredTargetRef.current);
        targetReady = true;
      } else {
        desiredTargetRef.current.set(0, 0, 0);
        targetReady = mode === "home";
      }
    }

    if (mode === "cubesat" && cubeSatRef.current) {
      cubeSatRef.current.getWorldPosition(targetRef.current);

      if (modeChanged) {
        offsetRef.current.copy(targetRef.current).normalize().multiplyScalar(0.5);
        desiredCameraRef.current
          .copy(targetRef.current)
          .add(offsetRef.current)
          .addScaledVector(camera.up, 0.15);
        desiredTargetRef.current.copy(targetRef.current);
      } else {
        offsetRef.current
          .copy(targetRef.current)
          .sub(previousTargetRef.current);
        if (transitionTimeRef.current >= 1.5) {
          camera.position.add(offsetRef.current);
          controlsRef.current.target.copy(targetRef.current);
        } else {
          desiredCameraRef.current.add(offsetRef.current);
          desiredTargetRef.current.copy(targetRef.current);
        }
      }

      previousTargetRef.current.copy(targetRef.current);
      targetReady = true;
    }

    if (mode === "moon" && moonRef.current && moonPanelRef.current) {
      moonRef.current.getWorldPosition(targetRef.current);
      moonPanelRef.current.getWorldPosition(moonPanelPositionRef.current);
      desiredTargetRef.current
        .copy(targetRef.current)
        .lerp(moonPanelPositionRef.current, 0.5);
      moonRadialRef.current.copy(targetRef.current).normalize();
      desiredCameraRef.current
        .copy(targetRef.current)
        .addScaledVector(moonRadialRef.current, -8);
      targetReady = true;
    }

    if (mode !== "free" && targetReady && transitionTimeRef.current < 1.5) {
      const blend = 1 - Math.exp(-4 * delta);
      camera.position.lerp(desiredCameraRef.current, blend);
      controlsRef.current.target.lerp(desiredTargetRef.current, blend);
      transitionTimeRef.current += delta;
    } else if (
      targetReady &&
      (mode === "home" || mode === "resume" || mode === "moon" || mode === "trajectory")
    ) {
      camera.position.copy(desiredCameraRef.current);
      controlsRef.current.target.copy(desiredTargetRef.current);
    }

    controlsRef.current.update();
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
  const [language, setLanguage] = useState("en");
  const [cubeSatTargetVisible, setCubeSatTargetVisible] = useState(false);
  const [showCatchMessage, setShowCatchMessage] = useState(false);
  const cubeSatRef = useRef();
  const resumeRef = useRef();
  const moonRef = useRef();
  const moonPanelRef = useRef();
  const trajectoryRef = useRef();
  const targetTimerRef = useRef();
  const messageTimerRef = useRef();

  useEffect(() => () => {
    window.clearTimeout(targetTimerRef.current);
    window.clearTimeout(messageTimerRef.current);
    document.body.style.cursor = "default";
  }, []);

  const startCatchWindow = () => {
    window.clearTimeout(targetTimerRef.current);
    document.body.style.cursor = "pointer";
    setCubeSatTargetVisible(true);
  };

  const endCatchWindow = () => {
    document.body.style.cursor = "default";
    window.clearTimeout(targetTimerRef.current);
    targetTimerRef.current = window.setTimeout(() => {
      setCubeSatTargetVisible(false);
    }, 1500);
  };

  const catchCubeSat = () => {
    window.clearTimeout(targetTimerRef.current);
    window.clearTimeout(messageTimerRef.current);
    setCubeSatTargetVisible(false);
    setShowCatchMessage(true);
    setCameraMode("cubesat");
    messageTimerRef.current = window.setTimeout(() => {
      setShowCatchMessage(false);
    }, 4500);
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
        <Sun visible={cameraMode !== "moon"} />

        <Suspense fallback={null}>
          <Earth
            quality="auto"
            onHoverStart={startCatchWindow}
            onHoverEnd={endCatchWindow}
          />
        </Suspense>

        <Moon
          objectRef={moonRef}
          panelRef={moonPanelRef}
          onSelect={() => setCameraMode("moon")}
          showContent={cameraMode === "moon"}
          language={language}
        />

        <Suspense fallback={null}>
          <HomeContent
            visible={cameraMode !== "cubesat" && cameraMode !== "trajectory"}
            faceCamera={cameraMode === "home"}
            resumeRef={resumeRef}
            onSelectResume={() => setCameraMode("resume")}
            resumeActive={cameraMode === "resume"}
            onGoHome={() => setCameraMode("home")}
            language={language}
            onLanguageChange={setLanguage}
            onSelectTrajectories={() => setCameraMode("trajectory")}
          />
        </Suspense>

        {(cameraMode === "home" || cameraMode === "trajectory") && (
          <Suspense fallback={null}>
            <TrajectoryWork
              objectRef={trajectoryRef}
              showContent={cameraMode === "trajectory"}
              onSelect={() => setCameraMode("trajectory")}
            />
          </Suspense>
        )}

        {/* CubeSat */}
        <CubeSat
          modelUrl={CUBESAT_MODEL_URL}
          objectRef={cubeSatRef}
          onSelect={() => setCameraMode("cubesat")}
          showLabel={cameraMode === "cubesat"}
          showTarget={cubeSatTargetVisible && cameraMode !== "cubesat"}
          onCatch={catchCubeSat}
        />

        <CameraControls
          mode={cameraMode}
          cubeSatRef={cubeSatRef}
          resumeRef={resumeRef}
          moonRef={moonRef}
          moonPanelRef={moonPanelRef}
          trajectoryRef={trajectoryRef}
        />
      </Canvas>
      <div className="view-mode-controls" role="group" aria-label="Camera view">
        {["home", "free", "cubesat", "moon", "trajectory", "resume"].map((mode) => (
          <button
            className="view-mode-button"
            type="button"
            key={mode}
            aria-pressed={cameraMode === mode}
            onClick={() => setCameraMode(mode)}
          >
            {mode === "cubesat"
              ? "CubeSat"
              : mode === "trajectory"
                ? "Trajectories"
                : mode[0].toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>
      {showCatchMessage && (
        <div className="catch-message" role="status">
          Congrats on catching the CubeSat!
        </div>
      )}
      <LoadingScreen />
    </div>
  );
}

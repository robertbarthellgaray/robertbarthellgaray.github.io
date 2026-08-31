import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "./components/Earth";
import LoadingScreen from "./components/LoadingScreen";

function CubeSat() {
  return (
    <mesh position={[2, 0, 0]}>
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ alpha: false }}
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
          <Earth quality="portfolio" />
        </Suspense>

        {/* CubeSat */}
        <CubeSat />

        {/* Mouse controls */}
        <OrbitControls enablePan={false} minDistance={2.4} maxDistance={7} />
      </Canvas>
      <LoadingScreen />
    </div>
  );
}

import { AdditiveBlending, BackSide } from "three";
import { EARTH_RADIUS } from "../spaceConstants";

const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewDirection;

    void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vNormal = normalize(mat3(modelMatrix) * normal);
        vViewDirection = normalize(cameraPosition - worldPosition.xyz);
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
`;

const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vViewDirection;

    void main() {
        float rim = 1.0 - abs(dot(vNormal, vViewDirection));
        float intensity = pow(rim, 4.5);
        gl_FragColor = vec4(0.08, 0.42, 1.0, intensity * 0.7);
    }
`;

export default function Atmosphere() {
    return (
        <mesh scale={1.02}>
            <sphereGeometry args={[EARTH_RADIUS, 96, 96]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                side={BackSide}
                blending={AdditiveBlending}
                transparent
                depthWrite={false}
            />
        </mesh>
    );
}

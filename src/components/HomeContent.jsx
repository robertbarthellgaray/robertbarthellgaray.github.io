import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Billboard, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import faceUrl from "../assets/MyFace.glb?url";
import jobsUrl from "../assets/MyJobs.glb?url";
import nameUrl from "../assets/MyName.glb?url";
import { EARTH_ROTATION_SPEED, EARTH_TILT } from "../spaceConstants";

function NormalizedModel({ url, size, position }) {
    const { scene } = useGLTF(url);
    const model = useMemo(() => {
        const object = scene.clone(true);
        const bounds = new Box3().setFromObject(object);
        const dimensions = bounds.getSize(new Vector3());
        const center = bounds.getCenter(new Vector3());
        const largestDimension = Math.max(
            dimensions.x,
            dimensions.y,
            dimensions.z,
        );

        return {
            object,
            center: [-center.x, -center.y, -center.z],
            scale: largestDimension > 0 ? size / largestDimension : 1,
        };
    }, [scene, size]);

    return (
        <Billboard position={position} follow>
            <group scale={model.scale} rotation={[0, Math.PI / 2, 0]}>
                <primitive object={model.object} position={model.center} />
            </group>
        </Billboard>
    );
}

export default function HomeContent({ visible }) {
    const orbitRef = useRef();
    const { size } = useThree();
    const compact = size.width < 700;

    useFrame(({ clock }) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y =
                clock.elapsedTime * EARTH_ROTATION_SPEED;
        }
    });

    return (
        <group rotation={[0, 0, -EARTH_TILT]} visible={visible}>
            <group ref={orbitRef}>
                <NormalizedModel
                    url={faceUrl}
                    size={compact ? 1.3 : 2.4}
                    position={compact ? [-1, 1.5, 52] : [-2.5, 0, 35]}
                />
                <NormalizedModel
                    url={nameUrl}
                    size={compact ? 1.7 : 2.4}
                    position={compact ? [-0.3, 1.5, 52] : [1.8, 0.9, 35]}
                />
                <NormalizedModel
                    url={jobsUrl}
                    size={compact ? 1.6 : 2.2}
                    position={compact ? [-0.6, -1.6, 52] : [1.8, -0.9, 35]}
                />
            </group>
        </group>
    );
}

useGLTF.preload(faceUrl);
useGLTF.preload(nameUrl);
useGLTF.preload(jobsUrl);

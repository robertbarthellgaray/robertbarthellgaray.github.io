import { useProgress } from "@react-three/drei";

export default function LoadingScreen() {
    const { active, progress, loaded, total } = useProgress();
    const complete = !active && total > 0 && loaded === total;

    if (complete) return null;

    return (
        <div className="loading-screen" role="status" aria-live="polite">
            <div className="loading-screen__label">
                <span>Loading Earth</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="loading-screen__track">
                <div
                    className="loading-screen__progress"
                    style={{ transform: `scaleX(${progress / 100})` }}
                />
            </div>
        </div>
    );
}

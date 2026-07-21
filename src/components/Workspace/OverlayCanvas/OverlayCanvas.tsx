import { useEffect, useRef } from "react";

import { Explorer } from "../../../core/Explorer";
import { OverlayEngine } from "../../../canvas/OverlayEngine";

interface OverlayCanvasProps {
    explorer: Explorer;
}

function OverlayCanvas({ explorer }: OverlayCanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (!canvasRef.current) {
            return;
        }

        const engine = new OverlayEngine(
            canvasRef.current,
            explorer
        );

        engine.start();

        return () => {

            engine.stop();

        };

    }, [explorer]);

    return (
        <canvas
            ref={canvasRef}
            className="overlay-canvas"
        />
    );

}

export default OverlayCanvas;
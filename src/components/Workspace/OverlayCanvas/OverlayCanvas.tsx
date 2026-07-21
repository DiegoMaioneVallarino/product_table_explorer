import { useRef } from "react";
import { Explorer } from "../../../core/Explorer";

interface OverlayCanvasProps {
    explorer: Explorer;
}

function OverlayCanvas({ explorer }: OverlayCanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <canvas
            ref={canvasRef}
            className="overlay-canvas"
        />
    );

}

export default OverlayCanvas;
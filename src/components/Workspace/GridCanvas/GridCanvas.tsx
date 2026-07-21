import { useEffect, useRef } from "react";

import { Engine } from "../../../canvas/Engine";
import { Explorer } from "../../../core/Explorer";

interface GridCanvasProps {
    explorer: Explorer;
}

function GridCanvas({ explorer }: GridCanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (!canvasRef.current) return;

        const engine = new Engine(
            canvasRef.current,
            explorer
        );

        engine.start();

        return () => engine.stop();

    }, [explorer]);

    return (
        <canvas
            ref={canvasRef}
            className="grid-canvas"
        />
    );

}

export default GridCanvas;
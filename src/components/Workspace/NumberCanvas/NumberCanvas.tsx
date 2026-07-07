import { useEffect, useRef } from 'react';

import { Engine } from '../../../canvas/Engine';
import { Explorer } from '../../../core/Explorer';

interface NumberCanvasProps {
    explorer: Explorer;
}

function NumberCanvas({ explorer }: NumberCanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (!canvasRef.current) return;

        const engine = new Engine(
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
            className="number-canvas"
        />
    );

}

export default NumberCanvas;
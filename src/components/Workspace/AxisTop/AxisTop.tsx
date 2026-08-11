import { useEffect, useRef } from 'react';

import { AxisRenderer } from '../../../canvas/AxisRenderer';
import { Explorer } from '../../../core/Explorer';

interface AxisTopProps {
    explorer: Explorer;
}

function AxisTop({ explorer }: AxisTopProps) {

    const canvasRef =
        useRef<HTMLCanvasElement>(null);

    const camera =
        explorer.camera;

    useEffect(() => {

        if (!canvasRef.current) {
            return;
        }

        const renderer =
            new AxisRenderer(
                canvasRef.current,
                camera,
                explorer.numberFormatter
            );

        renderer.renderHorizontal();

        const unsubscribe =
            camera.onChange(() => {
                renderer.renderHorizontal();
            });

        const unsubscribeNumberSystem =
            explorer.numberSystem.onChange(() => {
                renderer.renderHorizontal();
            });

        return () => {

            unsubscribe();

            unsubscribeNumberSystem();

        };

    }, [
        explorer,
        camera
    ]);

    return (
        <canvas
            ref={canvasRef}
            className="axis-top"
        />
    );

}

export default AxisTop;
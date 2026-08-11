import { useEffect, useRef } from 'react';

import { AxisRenderer } from '../../../canvas/AxisRenderer';
import { Explorer } from '../../../core/Explorer';

interface AxisLeftProps {
    explorer: Explorer;
}

function AxisLeft({ explorer }: AxisLeftProps) {

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

        renderer.renderVertical();

        const unsubscribe =
            camera.onChange(() => {
                renderer.renderVertical();
            });

        const unsubscribeNumberSystem =
            explorer.numberSystem.onChange(() => {
                renderer.renderVertical();
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
            className="axis-left"
        />
    );

}

export default AxisLeft;
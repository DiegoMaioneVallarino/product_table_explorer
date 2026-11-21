import { useEffect, useRef } from 'react';

import { AxisRenderer } from '../../../canvas/AxisRenderer';
import { Explorer } from '../../../core/Explorer';

interface AxisLeftProps {
    explorer: Explorer;
}

function AxisLeft({ explorer }: AxisLeftProps) {

    const canvasRef =
        useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (!canvasRef.current) {
            return;
        }

        const renderer =
            new AxisRenderer(
                canvasRef.current,
                explorer.camera,
                explorer.numberFormatter,
                'vertical'
            );

        renderer.render();

        const invalidate = (): void => renderer.invalidate();

        const unsubscribeCamera =
            explorer.camera.onChange(invalidate);

        const unsubscribeNumberSystem =
            explorer.numberSystem.onChange(invalidate);

        return () => {

            unsubscribeCamera();

            unsubscribeNumberSystem();

            renderer.destroy();

        };

    }, [explorer]);

    return (
        <canvas
            ref={canvasRef}
            className="axis-left"
        />
    );

}

export default AxisLeft;

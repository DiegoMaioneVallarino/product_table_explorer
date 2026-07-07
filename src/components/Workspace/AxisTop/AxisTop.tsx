import { useEffect, useRef } from 'react';

import { AxisRenderer } from '../../../canvas/AxisRenderer';

import { Explorer } from '../../../core/Explorer';

interface AxisTopProps {
    explorer: Explorer;
}

function AxisTop({ explorer }: AxisTopProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const camera = explorer.camera

  useEffect(() => {

    if (!canvasRef.current) return;

    const renderer = new AxisRenderer(
        canvasRef.current,
        explorer.camera
    );

    renderer.renderHorizontal();

    const unsubscribe = explorer.camera.onChange(() => {
        renderer.renderHorizontal();
    });

    return () => {
        unsubscribe();
    };

}, [camera]);

  return (
    <canvas
      ref={canvasRef}
      className="axis-top"
    />
  );
}

export default AxisTop;
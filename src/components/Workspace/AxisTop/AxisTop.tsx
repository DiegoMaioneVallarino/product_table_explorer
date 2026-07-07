import { useEffect, useRef } from 'react';

import { Camera } from '../../../canvas/Camera';
import { AxisRenderer } from '../../../canvas/AxisRenderer';

interface AxisTopProps {
  camera: Camera;
}

function AxisTop({ camera }: AxisTopProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    if (!canvasRef.current) return;

    const renderer = new AxisRenderer(
        canvasRef.current,
        camera
    );

    renderer.renderHorizontal();

    const unsubscribe = camera.onChange(() => {
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
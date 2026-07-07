import { useEffect, useRef } from 'react';

import { Camera } from '../../../canvas/Camera';
import { AxisRenderer } from '../../../canvas/AxisRenderer';

interface AxisLeftProps {
  camera: Camera;
}

function AxisLeft({ camera }: AxisLeftProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    if (!canvasRef.current) return;

    const renderer = new AxisRenderer(
        canvasRef.current,
        camera
    );

    renderer.renderVertical();

    const unsubscribe = camera.onChange(() => {
        renderer.renderVertical();
    });

    return () => {
        unsubscribe();
    };

}, [camera]);

  return (
    <canvas
      ref={canvasRef}
      className="axis-left"
    />
  );
}

export default AxisLeft;
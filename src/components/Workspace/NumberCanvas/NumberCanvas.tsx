import { useEffect, useRef } from 'react';

import { Camera } from '../../../canvas/Camera';
import { Engine } from '../../../canvas/Engine';

interface NumberCanvasProps {
  camera: Camera;
}

function NumberCanvas({ camera }: NumberCanvasProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    if (!canvasRef.current) return;

    const engine = new Engine(
      canvasRef.current,
      camera
    );

    engine.start();

    return () => {
      engine.stop();
    };

  }, [camera]);

  return (
    <canvas
      ref={canvasRef}
      className="number-canvas"
    />
  );

}

export default NumberCanvas;
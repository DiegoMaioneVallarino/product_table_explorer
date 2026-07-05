import { useEffect, useRef } from 'react';

import { Camera } from '../../../canvas/Camera';
import { Renderer } from '../../../canvas/Renderer';

interface NumberCanvasProps {
  camera: Camera;
}

function NumberCanvas({ camera }: NumberCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const renderer = new Renderer(canvas, camera);

    renderer.render();

    let dragging = false;

    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      dragging = true;

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseUp = () => {
      dragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;

      lastX = e.clientX;
      lastY = e.clientY;

      camera.offsetX -= dx / camera.cellSize;
      camera.offsetY -= dy / camera.cellSize;

      renderer.redraw();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
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
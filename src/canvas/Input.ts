import { Camera } from './Camera';
import { Renderer } from './Renderer';
import { Explorer } from '../core/Explorer';

export class Input {
  private dragging = false;

  private lastX = 0;
  private lastY = 0;


  constructor(
      private canvas: HTMLCanvasElement,
      private explorer: Explorer,
  ) {}

  private get camera(): Camera {
    return this.explorer.camera;
}
private handleWheel = (e: WheelEvent): void => {

  e.preventDefault();

  const direction = e.deltaY < 0
      ? 1
      : -1;

  this.camera.zoomAt(
      e.offsetX,
      e.offsetY,
      direction
  );

};
  public start(): void {
    this.canvas.addEventListener('mousedown', this.handleMouseDown);

    window.addEventListener('mousemove', this.handleMouseMove);

    window.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('wheel', this.handleWheel, {
      passive: false
  });
  }

  public stop(): void {
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);

    window.removeEventListener('mousemove', this.handleMouseMove);

    window.removeEventListener('mouseup', this.handleMouseUp);
    this.canvas.removeEventListener('wheel', this.handleWheel);
  }

  private handleMouseDown = (e: MouseEvent): void => {

    this.dragging = true;

    this.lastX = e.clientX;
    this.lastY = e.clientY;

    const cell = this.camera.screenToCell(
        e.offsetX,
        e.offsetY
    );

    this.explorer.selection.select(
        cell.row,
        cell.column
    );

};

  private handleMouseMove = (e: MouseEvent): void => {

    const cell = this.camera.screenToCell(
        e.offsetX,
        e.offsetY
    );

    this.explorer.selection.hover(
        cell.row,
        cell.column
    );

    if (!this.dragging) {
        return;
    }

    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;

    this.lastX = e.clientX;
    this.lastY = e.clientY;

    this.camera.pan(dx, dy);

}

  private handleMouseUp = (): void => {
    this.dragging = false;
  };
}
import { Camera } from './Camera';

export class AxisRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(
    canvas: HTMLCanvasElement,
    private camera: Camera
  ) {
    this.canvas = canvas;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No se pudo obtener el contexto 2D.');
    }

    this.ctx = ctx;
  }

  public renderHorizontal(): void {
    this.resize();
    this.clear();

    const firstCol = this.camera.firstVisibleColumn();
    const cols = this.camera.visibleColumns(this.canvas.width);

    this.ctx.fillStyle = '#fff';
    this.ctx.font = `${this.camera.cellSize * 0.35}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    for (let col = firstCol; col < firstCol + cols; col++) {
      this.ctx.fillText(
        (col + 1).toString(),
        this.camera.cellCenterX(col),
        this.canvas.height / 2
      );
    }
  }

  public renderVertical(): void {
    this.resize();
    this.clear();

    const firstRow = this.camera.firstVisibleRow();
    const rows = this.camera.visibleRows(this.canvas.height);

    this.ctx.fillStyle = '#fff';
    this.ctx.font = `${this.camera.cellSize * 0.35}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    for (let row = firstRow; row < firstRow + rows; row++) {
      this.ctx.fillText(
        (row + 1).toString(),
        this.canvas.width / 2,
        this.camera.cellCenterY(row)
      );
    }
  }

  private resize(): void {
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  private clear(): void {
    this.ctx.fillStyle = '#222';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public bindHorizontal(): void {

    this.camera.onChange(() => {
        this.renderHorizontal();
    });

    this.renderHorizontal();

}

public bindVertical(): void {

    this.camera.onChange(() => {
        this.renderVertical();
    });

    this.renderVertical();

}
}
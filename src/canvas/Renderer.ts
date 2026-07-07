import { Camera } from './Camera';
import { ProductTable } from '../math/ProductTable';
import { ProductCell } from '../math/ProductCell';


export class Renderer {

  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private camera: Camera;

  private table = new ProductTable();

  private unsubscribe?: () => void;

  constructor(
    canvas: HTMLCanvasElement,
    camera: Camera
  ) {

    this.canvas = canvas;
    this.camera = camera;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No se pudo obtener el contexto 2D.');
    }

    this.ctx = ctx;

    this.unsubscribe = this.camera.onChange(() => {
      this.render();
    });

  }

  public render(): void {

    this.resize();

    this.clear();

    this.drawCells();

    if (this.camera.showNumbers) {
      this.drawNumbers();
    }

  }

  private resize(): void {

    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

  }

  private clear(): void {

    this.ctx.fillStyle = '#111';

    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

  }

  private drawCells(): void {

    this.ctx.lineWidth = 1;

    this.forEachVisibleCell((cell) => {

      this.ctx.strokeStyle =
        cell.isPerfectSquare
          ? '#d4af37'
          : '#333';

      this.ctx.strokeRect(

        this.camera.cellLeft(cell.column),
        this.camera.cellTop(cell.row),

        this.camera.cellSize,
        this.camera.cellSize

      );

    });

  }

  private drawNumbers(): void {

    this.ctx.fillStyle = '#ddd';

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.font = `${this.camera.fontSize}px Arial`;

    this.forEachVisibleCell((cell) => {

      this.ctx.fillText(

        cell.screenLabel,

        this.camera.cellCenterX(cell.column),
        this.camera.cellCenterY(cell.row)

      );

    });

  }

  private forEachVisibleCell(
    callback: (cell: ProductCell) => void
  ): void {
  
      const firstCol = this.camera.firstVisibleColumn();
      const firstRow = this.camera.firstVisibleRow();
  
      const cols = this.camera.visibleColumns(this.canvas.width);
      const rows = this.camera.visibleRows(this.canvas.height);
  
      for (let row = firstRow; row < firstRow + rows; row++) {
  
          for (let col = firstCol; col < firstCol + cols; col++) {
  
              const cell = this.table.getCell(row, col);
  
              if (!cell.isVisible) {
                  continue;
              }
  
              callback(cell);
  
          }
  
      }
  
  }

  public redraw(): void {

    this.render();

  }

  public destroy(): void {

    this.unsubscribe?.();

  }

}
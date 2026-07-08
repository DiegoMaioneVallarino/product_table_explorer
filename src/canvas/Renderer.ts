import { Explorer } from '../core/Explorer';
import { ProductCell } from '../math/ProductCell';


export class Renderer {

  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private explorer: Explorer;



  constructor(
    canvas: HTMLCanvasElement,
    explorer: Explorer
  ) {
    
  
  this.unsubscribeSelection = explorer.selection.onChange(() => {
      this.render();
  });
    this.canvas = canvas;
    this.explorer = explorer;
  
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No se pudo obtener el contexto 2D.");
    }

    this.ctx = ctx;

    this.unsubscribeCamera = this.camera.onChange(() => {
        this.render();
    });

    this.unsubscribeSelection = this.selection.onChange(() => {
        this.render();
    });

  

  }
  
  private drawHighlightedBackground(cell: ProductCell): void {

    this.ctx.fillStyle = "rgba(70,120,255,0.18)";

    this.ctx.fillRect(
        this.camera.cellLeft(cell.column),
        this.camera.cellTop(cell.row),
        this.camera.cellSize,
        this.camera.cellSize
    );

}

  private unsubscribeCamera?: () => void;
private unsubscribeSelection?: () => void;

private drawCellBackground(cell: ProductCell): void {

  if (!cell.isPerfectSquare) {
      return;
  }

  this.ctx.fillStyle = "rgba(212,175,55,0.18)";

  this.ctx.fillRect(
      this.camera.cellLeft(cell.column),
      this.camera.cellTop(cell.row),
      this.camera.cellSize,
      this.camera.cellSize
  );

}

private drawCell(cell: ProductCell): void {

  this.drawCellBackground(cell);

  if (this.isHighlighted(cell)) {
      this.drawHighlightedBackground(cell);
  }

  this.drawCellBorder(cell);

  if (this.camera.showNumbers) {
      this.drawCellLabel(cell);
  }

  if (
      cell.row === this.selection.getHoverRow() &&
      cell.column === this.selection.getHoverColumn()
  ) {
      this.drawHover(cell);
  }

  if (
      cell.row === this.selection.getSelectedRow() &&
      cell.column === this.selection.getSelectedColumn()
  ) {
      this.drawSelection(cell);
  }

}


private get camera() {
  return this.explorer.camera;
}

private get table() {
  return this.explorer.table;
}

private get selection() {
  return this.explorer.selection;
}

private drawHover(cell: ProductCell): void {

  this.ctx.lineWidth = 2;
  this.ctx.strokeStyle = "#66CCFF";

  this.ctx.strokeRect(
      this.camera.cellLeft(cell.column),
      this.camera.cellTop(cell.row),
      this.camera.cellSize,
      this.camera.cellSize
  );

}
private drawSelection(cell: ProductCell): void {

  this.ctx.lineWidth = 3;
  this.ctx.strokeStyle = "#00BFFF";

  this.ctx.strokeRect(
      this.camera.cellLeft(cell.column),
      this.camera.cellTop(cell.row),
      this.camera.cellSize,
      this.camera.cellSize
  );

}
private drawCellBorder(cell: ProductCell): void {

  this.ctx.lineWidth = 1;

  this.ctx.strokeStyle = "#333";

  this.ctx.strokeRect(

      this.camera.cellLeft(cell.column),
      this.camera.cellTop(cell.row),

      this.camera.cellSize,
      this.camera.cellSize

  );

}
  private drawVisibleCells(): void {

    this.forEachVisibleCell((cell) => {

        this.drawCell(cell);

    });

}

  public render(): void {

    this.resize();

    this.clear();

    this.drawVisibleCells();
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


  private drawCellLabel(cell: ProductCell): void {

    this.ctx.fillStyle = "#ddd";

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.font = `${this.camera.fontSize}px Arial`;

    this.ctx.fillText(

        cell.screenLabel,

        this.camera.cellCenterX(cell.column),
        this.camera.cellCenterY(cell.row)

    );

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
  private isHighlighted(cell: ProductCell): boolean {

    if (!this.selection.hasSelection()) {
        return false;
    }

    return (
        cell.row === this.selection.getSelectedRow() ||
        cell.column === this.selection.getSelectedColumn()
    );

}
  public redraw(): void {

    this.render();

  }

  public destroy(): void {

    this.unsubscribeCamera?.();
    this.unsubscribeSelection?.();
  }

}
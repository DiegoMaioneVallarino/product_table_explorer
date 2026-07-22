import { Explorer } from '../core/Explorer';
import { ProductCell } from '../math/ProductCell';

import type { CellStyle } from './CellStyle';


export class Renderer {

  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private explorer: Explorer;



  constructor(
    explorer: Explorer,
    canvas: HTMLCanvasElement,

) {

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

  
}
  
 

  private unsubscribeCamera?: () => void;

private drawCellBackground(
  cell: ProductCell,
  style: CellStyle
): void {

  if (!style.backgroundColor) {
      return;
  }

  this.ctx.fillStyle = style.backgroundColor;

  this.ctx.fillRect(

      this.camera.cellLeft(cell.column),
      this.camera.cellTop(cell.row),

      this.camera.cellSize,
      this.camera.cellSize

  );

}

private drawCell(cell: ProductCell): void {

  const style = this.explorer.visual.getCellStyle(cell);

  this.drawCellBackground(cell, style);

  this.drawCellHighlight(cell, style);

  this.drawCellBorder(cell, style);

  if (this.camera.showNumbers) {

      this.drawCellLabel(cell, style);

  }

}
private drawCellHighlight(
  cell: ProductCell,
  style: CellStyle
): void {

  let color = style.highlightColor;

  if (this.explorer.modularCurve.contains(cell)) {

      color = "rgba(0,255,0,0.45)";

  }

  if (!color) {
      return;
  }

  this.ctx.fillStyle = color;

  this.ctx.fillRect(

      this.camera.cellLeft(cell.column),
      this.camera.cellTop(cell.row),

      this.camera.cellSize,
      this.camera.cellSize

  );

}

private get camera() {
  return this.explorer.camera;
}

private get table() {
  return this.explorer.table;
}







private drawCellBorder(cell: ProductCell, style:CellStyle): void {
  this.ctx.lineWidth = style.borderWidth;

  this.ctx.strokeStyle = style.borderColor;

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

    this.ctx.fillStyle = '#0c0c0c';

    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

  }


  private drawCellLabel(cell: ProductCell, style: CellStyle): void {

    this.ctx.fillStyle = style.textColor;
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

  public redraw(): void {

    this.render();

  }

  public destroy(): void {

    this.unsubscribeCamera?.();

}

}
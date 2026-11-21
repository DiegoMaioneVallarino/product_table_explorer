import { Explorer } from '../core/Explorer';

import { CanvasSurface } from './CanvasSurface';
import { FrameRequest } from './FrameRequest';

/** Por debajo de este tamaño de celda, los bordes de 1px taparían todo. */
const MIN_CELL_SIZE_FOR_BORDERS = 4;

const CURVE_HIGHLIGHT = 'rgba(0,255,0,0.45)';
const FUNCTION_COLOR_ALPHA = 0.35;

export class Renderer {

  private readonly surface: CanvasSurface;

  private readonly frame = new FrameRequest(() => this.render());

  private readonly unsubscribers: Array<() => void> = [];

  constructor(
    private readonly explorer: Explorer,
    canvas: HTMLCanvasElement
  ) {

    this.surface = new CanvasSurface(canvas);

    const invalidate = (): void => this.invalidate();

    this.unsubscribers.push(
      explorer.camera.onChange(invalidate),
      explorer.numberSystem.onChange(invalidate),
      explorer.functionEngine.onChange(invalidate),
      explorer.curveChanged.subscribe(invalidate)
    );

    this.surface.observeResize(invalidate);

  }

  /** Pide un redibujado; varias peticiones en un frame se funden en una. */
  public invalidate(): void {

    this.frame.request();

  }

  public redraw(): void {

    this.invalidate();

  }

  public render(): void {

    this.frame.cancel();

    this.surface.sync();

    const { ctx, width, height } = this.surface;

    const {
      camera,
      table,
      visual,
      functionEngine,
      numberColorRule,
      numberFormatter,
      modularCurve
    } = this.explorer;

    ctx.fillStyle = '#0c0c0c';
    ctx.fillRect(0, 0, width, height);

    const cellSize = camera.cellSize;
    const showBorders = cellSize >= MIN_CELL_SIZE_FOR_BORDERS;
    const showLabels = camera.showNumbers;

    if (showLabels) {
      ctx.font = `${camera.fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    }

    const firstRow = camera.firstVisibleRow();
    const firstCol = camera.firstVisibleColumn();

    const endRow = firstRow + camera.visibleRows(height);
    const endCol = firstCol + camera.visibleColumns(width);

    for (let row = Math.max(0, firstRow); row < endRow; row++) {

      // Solo existe el triángulo column <= row: ni siquiera creamos el resto.
      const colEnd = Math.min(endCol, row + 1);

      for (let col = Math.max(0, firstCol); col < colEnd; col++) {

        const cell = table.getCell(row, col);

        const style = visual.getCellStyle(cell);

        const x = camera.cellLeft(col);
        const y = camera.cellTop(row);

        if (style.backgroundColor) {
          ctx.fillStyle = style.backgroundColor;
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        const highlight =
          modularCurve.contains(cell)
            ? CURVE_HIGHLIGHT
            : style.highlightColor;

        if (highlight) {
          ctx.fillStyle = highlight;
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        // La función se evalúa una sola vez por celda (color y etiqueta).
        const transformed = functionEngine.evaluate(cell.value);

        const color = numberColorRule.getColor(transformed);

        if (color) {
          ctx.fillStyle = color;
          ctx.globalAlpha = FUNCTION_COLOR_ALPHA;
          ctx.fillRect(x, y, cellSize, cellSize);
          ctx.globalAlpha = 1;
        }

        if (showBorders) {
          ctx.lineWidth = style.borderWidth;
          ctx.strokeStyle = style.borderColor;
          ctx.strokeRect(x, y, cellSize, cellSize);
        }

        if (showLabels) {
          ctx.fillStyle = style.textColor;
          ctx.fillText(
            numberFormatter.format(transformed),
            x + cellSize / 2,
            y + cellSize / 2
          );
        }

      }

    }

  }

  public destroy(): void {

    this.frame.cancel();

    this.surface.dispose();

    for (const unsubscribe of this.unsubscribers) {
      unsubscribe();
    }

    this.unsubscribers.length = 0;

  }

}

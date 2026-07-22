
export class Camera {

  private offsetX = 0;
  private offsetY = 0;

  private readonly zoomLevels = [
    1,
    2,
    4,
    6,
    8,
    12,
    16,
    24,
    32,
    48,
    64,
    96,
  
  
    
];

private zoomIndex = 10;
public get cellSize(): number {
    return this.zoomLevels[this.zoomIndex];
}

  private listeners = new Set<() => void>();

public onChange(listener: () => void): () => void {

    this.listeners.add(listener);

    return () => {
        this.listeners.delete(listener);
    };

}

private notify(): void {

    for (const listener of this.listeners) {
        listener();
    }

}

public pan(
    dx: number,
    dy: number
): void {

    this.offsetX -= dx / this.cellSize;
    this.offsetY -= dy / this.cellSize;
    this.offsetX = Math.max(0, this.offsetX);
    this.offsetY = Math.max(0, this.offsetY);
    this.notify();

}

public refresh(): void {

    this.notify();

}
public get showNumbers(): boolean {

    return this.cellSize >= 18;

}
public get fontSize(): number {

    return this.cellSize * 0.30;

}

public get pointMode(): boolean {

    return this.cellSize <= 3;

}
public zoomIn(): void {

    if (this.zoomIndex >= this.zoomLevels.length - 1)
        return;

    this.zoomIndex++;

    this.notify();

}

public zoomOut(): void {

    if (this.zoomIndex <= 0)
        return;

    this.zoomIndex--;

    this.notify();

}

  public getOffsetX(): number {
    return this.offsetX;
  }
  
  public getOffsetY(): number {
    return this.offsetY;
  }
    // ---------- Conversión ----------

    zoomAt(
        screenX,
        screenY,
        zoomStep: number

    ): void {
    
        const worldX = this.screenToWorldX(screenX);
        const worldY = this.screenToWorldY(screenY);
        
        this.zoomIndex += zoomStep;
        
        this.zoomIndex = Math.max(
            0,
            Math.min(
                this.zoomLevels.length - 1,
                this.zoomIndex
            )
        );
        
        this.offsetX = worldX - screenX / this.cellSize;
        this.offsetY = worldY - screenY / this.cellSize;
        
        this.notify();
    
    }
// ---------- Conversión ----------

public worldToScreenX(column: number): number {

    return (column - this.offsetX) * this.cellSize;

}

public worldToScreenY(row: number): number {

    return (row - this.offsetY) * this.cellSize;

}

public screenToWorldX(screenX: number): number {

    return screenX / this.cellSize + this.offsetX;

}

public screenToWorldY(screenY: number): number {

    return screenY / this.cellSize + this.offsetY;

}

public screenToColumn(screenX: number): number {

    return Math.floor(
        this.screenToWorldX(screenX)
    );

}

public screenToRow(screenY: number): number {

    return Math.floor(
        this.screenToWorldY(screenY)
    );

}

public screenToCell(
    screenX: number,
    screenY: number
): {
    row: number;
    column: number;
} {

    return {
        row: this.screenToRow(screenY),
        column: this.screenToColumn(screenX)
    };

}

  // ---------- Visibilidad ----------

  public firstVisibleColumn(): number {
      return Math.floor(this.offsetX);
  }

  public firstVisibleRow(): number {
      return Math.floor(this.offsetY);
  }

  public visibleColumns(canvasWidth: number): number {
      return Math.ceil(canvasWidth / this.cellSize) + 2;
  }

  public visibleRows(canvasHeight: number): number {
      return Math.ceil(canvasHeight / this.cellSize) + 2;
  }

  // ---------- Geometría ----------

  public cellLeft(column: number): number {
      return this.worldToScreenX(column);
  }

  public cellTop(row: number): number {
      return this.worldToScreenY(row);
  }

  public cellCenterX(column: number): number {
      return this.cellLeft(column) + this.cellSize / 2;
  }

  public cellCenterY(row: number): number {
      return this.cellTop(row) + this.cellSize / 2;
  }



  public panBy(dx: number, dy: number): void {

    this.offsetX += dx;
    this.offsetY += dy;
  
    this.notify();
  
  }
}
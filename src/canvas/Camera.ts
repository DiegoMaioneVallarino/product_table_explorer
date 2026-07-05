export class Camera {
    public offsetX = 0;
    public offsetY = 0;
  
    public zoom = 1;
  
    public readonly baseCellSize = 40;
  
    get cellSize(): number {
      return this.baseCellSize * this.zoom;
    }
  
    worldToScreenX(column: number): number {
      return (column - this.offsetX) * this.cellSize;
    }
  
    worldToScreenY(row: number): number {
      return (row - this.offsetY) * this.cellSize;
    }
  }
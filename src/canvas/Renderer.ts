import { Camera } from './Camera';

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private camera: Camera;

  constructor(canvas: HTMLCanvasElement, camera: Camera) {
    this.canvas = canvas;
    this.camera = camera;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No se pudo obtener el contexto 2D.');
    }

    this.ctx = ctx;
  }
    render() {
      this.resize();
  
      this.clear();
  
      this.drawGrid();
    }
  
    private resize() {
      const rect = this.canvas.getBoundingClientRect();
  
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }
  
    private clear() {
      this.ctx.fillStyle = '#111';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    private drawGrid() {

        const cellSize = this.camera.cellSize;
    
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
    
        const cols = Math.ceil(this.canvas.width / cellSize);
        const rows = Math.ceil(this.canvas.height / cellSize);
    
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
    
                this.ctx.strokeRect(
                    this.camera.worldToScreenX(col),
                    this.camera.worldToScreenY(row),
                    cellSize,
                    cellSize
                );
    
            }
        }
    
    }

    public redraw(): void {
        this.render();
      }
      
  }
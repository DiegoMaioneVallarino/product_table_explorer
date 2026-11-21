/**
 * Envuelve un canvas 2D:
 *  - sincroniza el tamaño del búfer con el tamaño CSS * devicePixelRatio
 *    y solo toca `canvas.width/height` cuando de verdad cambian
 *    (asignarlos borra y reasigna todo el bitmap);
 *  - deja el contexto en píxeles CSS, así el resto del código no sabe de DPR;
 *  - avisa cuando el elemento cambia de tamaño.
 */
export class CanvasSurface {

  public readonly ctx: CanvasRenderingContext2D;

  /** Ancho/alto en píxeles CSS (lo que usa el resto del código). */
  public width = 0;
  public height = 0;

  private observer?: ResizeObserver;

  constructor(public readonly canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No se pudo obtener el contexto 2D.');
    }

    this.ctx = ctx;

  }

  public sync(): void {

    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const pixelWidth = Math.max(1, Math.round(rect.width * dpr));
    const pixelHeight = Math.max(1, Math.round(rect.height * dpr));

    if (
      this.canvas.width !== pixelWidth ||
      this.canvas.height !== pixelHeight
    ) {
      this.canvas.width = pixelWidth;
      this.canvas.height = pixelHeight;
    }

    this.width = rect.width;
    this.height = rect.height;

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  }

  public observeResize(callback: () => void): void {

    this.observer?.disconnect();

    this.observer = new ResizeObserver(callback);
    this.observer.observe(this.canvas);

  }

  public dispose(): void {

    this.observer?.disconnect();
    this.observer = undefined;

  }

}

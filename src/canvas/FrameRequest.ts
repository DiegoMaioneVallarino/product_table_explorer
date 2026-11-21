/**
 * Agrupa muchas peticiones de redibujado en, como máximo, una por frame.
 * Si ya hay una pendiente, `request()` no hace nada.
 */
export class FrameRequest {

  private id = 0;

  constructor(private readonly callback: () => void) {}

  public request(): void {

    if (this.id !== 0) {
      return;
    }

    this.id = requestAnimationFrame(() => {
      this.id = 0;
      this.callback();
    });

  }

  public cancel(): void {

    if (this.id !== 0) {
      cancelAnimationFrame(this.id);
      this.id = 0;
    }

  }

}

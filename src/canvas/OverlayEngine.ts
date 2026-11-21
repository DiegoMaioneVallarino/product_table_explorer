import { Explorer } from "../core/Explorer";
import { OverlayRenderer } from "./OverlayRenderer";

/**
 * Dibuja el overlay bajo demanda. Solo hay un bucle de animación mientras el
 * camino se está construyendo; en reposo no corre nada.
 */
export class OverlayEngine {

    private renderer: OverlayRenderer;
    private animationId = 0;
    private unsubscribePath?: () => void;

    constructor(
        canvas: HTMLCanvasElement,
        private explorer: Explorer
    ) {

        this.renderer = new OverlayRenderer(
            canvas,
            explorer
        );

    }

    private tick = (): void => {

        this.animationId = 0;

        const builder = this.explorer.pathBuilder;

        if (!builder.isFinished()) {

            builder.step();

        }

        this.renderer.render();

        if (!builder.isFinished()) {

            this.animationId =
                requestAnimationFrame(
                    this.tick
                );

        }

    }

    private startAnimation(): void {

        if (this.animationId !== 0) {
            return;
        }

        this.animationId =
            requestAnimationFrame(
                this.tick
            );

    }

    public start(): void {

        this.unsubscribePath =
            this.explorer.pathChanged.subscribe(() => {
                this.startAnimation();
            });

        this.renderer.render();

        // Por si el efecto se vuelve a montar con un camino a medio construir.
        if (!this.explorer.pathBuilder.isFinished()) {
            this.startAnimation();
        }

    }

    public stop(): void {

        if (this.animationId !== 0) {
            cancelAnimationFrame(this.animationId);
            this.animationId = 0;
        }

        this.unsubscribePath?.();

        this.renderer.destroy();

    }

}

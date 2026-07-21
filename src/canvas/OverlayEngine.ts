import { Explorer } from "../core/Explorer";
import { OverlayRenderer } from "./OverlayRenderer";

export class OverlayEngine {

    private renderer: OverlayRenderer;
    private animationId = 0;
    
    
    constructor(
        canvas: HTMLCanvasElement,
        private explorer: Explorer
    ) {
    
        this.renderer = new OverlayRenderer(
            canvas,
            explorer
        );
    
    }
    private loop = (): void => {

        if (
            !this.explorer.pathBuilder.isFinished()
        ) {
    
            this.explorer.pathBuilder.step();
    
        }
    
        this.renderer.render();
    
        this.animationId =
            requestAnimationFrame(
                this.loop
            );
    
    }

    
    public start(): void {

        this.loop();
    
    }

    public stop(): void {

        cancelAnimationFrame(
            this.animationId
        );
    
        this.renderer.destroy();
    
    }

}
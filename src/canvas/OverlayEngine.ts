import { Explorer } from "../core/Explorer";
import { OverlayRenderer } from "./OverlayRenderer";

export class OverlayEngine {

    private renderer: OverlayRenderer;

    constructor(
        canvas: HTMLCanvasElement,
        explorer: Explorer
    ) {

        this.renderer = new OverlayRenderer(
            canvas,
            explorer
        );

    }

    public start(): void {

        this.renderer.render();

    }

    public stop(): void {}

}
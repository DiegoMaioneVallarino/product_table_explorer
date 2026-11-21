import { Explorer } from "../core/Explorer";
import { ProductPathNode } from "../math/path/ProductPathNode";

import { CanvasSurface } from "./CanvasSurface";
import { FrameRequest } from "./FrameRequest";

export class OverlayRenderer {

    private readonly surface: CanvasSurface;

    private readonly frame = new FrameRequest(() => this.render());

    private readonly unsubscribers: Array<() => void> = [];

    constructor(
        canvas: HTMLCanvasElement,
        private explorer: Explorer
    ) {

        this.surface = new CanvasSurface(canvas);

        const invalidate = (): void => this.invalidate();

        this.unsubscribers.push(
            explorer.camera.onChange(invalidate),
            explorer.selection.onChange(invalidate)
        );

        this.surface.observeResize(invalidate);

    }

    private get camera() {
        return this.explorer.camera;
    }

    private get selection() {
        return this.explorer.selection;
    }

    private get ctx() {
        return this.surface.ctx;
    }

    /** Pide un redibujado; varias peticiones en un frame se funden en una. */
    public invalidate(): void {

        this.frame.request();

    }

    public render(): void {

        this.frame.cancel();

        this.surface.sync();

        this.ctx.clearRect(
            0,
            0,
            this.surface.width,
            this.surface.height
        );

        if (this.selection.getHoverRow() >= 0) {

            this.drawHover(
                this.selection.getHoverRow(),
                this.selection.getHoverColumn()
            );

        }

        if (this.selection.hasSelection()) {

            this.drawSelection(
                this.selection.getSelectedRow(),
                this.selection.getSelectedColumn()
            );

        }

        this.drawPath();
    }

    private drawHover(
        row: number,
        column: number
    ): void {

        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "#66CCFF";

        this.ctx.strokeRect(
            this.camera.cellLeft(column),
            this.camera.cellTop(row),
            this.camera.cellSize,
            this.camera.cellSize
        );

    }

    private drawSelection(
        row: number,
        column: number
    ): void {

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "#00BFFF";

        this.ctx.strokeRect(
            this.camera.cellLeft(column),
            this.camera.cellTop(row),
            this.camera.cellSize,
            this.camera.cellSize
        );

    }

    private drawPath(): void {

        if (!this.explorer.path.root) {
            return;
        }

        this.drawNode(
            this.explorer.path.root
        );

    }

    private drawNode(
        node: ProductPathNode
    ): void {

        const cell = node.cell;

        this.ctx.fillStyle =
            "rgba(255,80,80,0.45)";

        this.ctx.fillRect(

            this.camera.cellLeft(cell.column),
            this.camera.cellTop(cell.row),

            this.camera.cellSize,
            this.camera.cellSize

        );

        for (const child of node.children) {

            this.drawNode(child);

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

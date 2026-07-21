import { Explorer } from "../core/Explorer";
import { ProductPathNode } from "../math/path/ProductPathNode";

export class OverlayRenderer {

    private ctx: CanvasRenderingContext2D;
    private unsubscribeCamera?: () => void;
    private unsubscribeSelection?: () => void;

    constructor(
        private canvas: HTMLCanvasElement,
        private explorer: Explorer
    ) {

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("No se pudo obtener el contexto.");
        }

        this.ctx = ctx;

        this.unsubscribeCamera =
            this.explorer.camera.onChange(() => {
                this.render();
            });

        this.unsubscribeSelection =
            this.explorer.selection.onChange(() => {
                this.render();
            });

    }

    private get camera() {
        return this.explorer.camera;
    }

    private get selection() {
        return this.explorer.selection;
    }
   
    public render(): void {

        const rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
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

        this.unsubscribeCamera?.();
        this.unsubscribeSelection?.();

    }

}
import { Camera } from './Camera';
import { NumberFormatter } from '../math/NumberFormatter';

export class AxisRenderer {

    private canvas: HTMLCanvasElement;

    private ctx: CanvasRenderingContext2D;

    constructor(
        canvas: HTMLCanvasElement,
        private camera: Camera,
        private numberFormatter: NumberFormatter
    ) {

        this.canvas = canvas;

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error(
                'No se pudo obtener el contexto 2D.'
            );
        }

        this.ctx = ctx;

    }

    public renderHorizontal(): void {

        this.resize();

        this.clear();

        const firstCol =
            this.camera.firstVisibleColumn();

        const cols =
            this.camera.visibleColumns(
                this.canvas.width
            );

        this.ctx.fillStyle = '#383737';

        this.ctx.font =
            `${this.camera.cellSize * 0.35}px Arial`;

        this.ctx.textAlign = 'center';

        this.ctx.textBaseline = 'middle';

        for (
            let col = firstCol;
            col < firstCol + cols;
            col++
        ) {

            this.ctx.fillText(

                this.numberFormatter.format(
                    col + 1
                ),

                this.camera.cellCenterX(col),

                this.canvas.height / 2

            );

        }

    }

    public renderVertical(): void {

        this.resize();

        this.clear();

        const firstRow =
            this.camera.firstVisibleRow();

        const rows =
            this.camera.visibleRows(
                this.canvas.height
            );

        this.ctx.fillStyle = '#383737';

        this.ctx.font =
            `${this.camera.cellSize * 0.35}px Arial`;

        this.ctx.textAlign = 'center';

        this.ctx.textBaseline = 'middle';

        for (
            let row = firstRow;
            row < firstRow + rows;
            row++
        ) {

            this.ctx.fillText(

                this.numberFormatter.format(
                    row + 1
                ),

                this.canvas.width / 2,

                this.camera.cellCenterY(row)

            );

        }

    }

    private resize(): void {

        const rect =
            this.canvas.getBoundingClientRect();

        this.canvas.width =
            rect.width;

        this.canvas.height =
            rect.height;

    }

    private clear(): void {

        this.ctx.fillStyle = '#0c0c0c';

        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }

}
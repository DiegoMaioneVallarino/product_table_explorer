import { Camera } from './Camera';
import { NumberFormatter } from '../math/NumberFormatter';

import { CanvasSurface } from './CanvasSurface';
import { FrameRequest } from './FrameRequest';

export type AxisOrientation = 'horizontal' | 'vertical';

export class AxisRenderer {

    private readonly surface: CanvasSurface;

    private readonly frame = new FrameRequest(() => this.render());

    constructor(
        canvas: HTMLCanvasElement,
        private camera: Camera,
        private numberFormatter: NumberFormatter,
        private orientation: AxisOrientation
    ) {

        this.surface = new CanvasSurface(canvas);

        this.surface.observeResize(() => this.invalidate());

    }

    /** Pide un redibujado; varias peticiones en un frame se funden en una. */
    public invalidate(): void {

        this.frame.request();

    }

    public render(): void {

        this.frame.cancel();

        this.surface.sync();

        const { ctx, width, height } = this.surface;

        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#383737';
        ctx.font = `${this.camera.cellSize * 0.35}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (this.orientation === 'horizontal') {

            const first = this.camera.firstVisibleColumn();
            const count = this.camera.visibleColumns(width);

            for (let col = first; col < first + count; col++) {

                ctx.fillText(
                    this.numberFormatter.format(col + 1),
                    this.camera.cellCenterX(col),
                    height / 2
                );

            }

        } else {

            const first = this.camera.firstVisibleRow();
            const count = this.camera.visibleRows(height);

            for (let row = first; row < first + count; row++) {

                ctx.fillText(
                    this.numberFormatter.format(row + 1),
                    width / 2,
                    this.camera.cellCenterY(row)
                );

            }

        }

    }

    public destroy(): void {

        this.frame.cancel();

        this.surface.dispose();

    }

}

import { ProductCell } from '../math/ProductCell';
import { Explorer } from './Explorer';
import type{ CellStyle } from '../canvas/CellStyle';

export class VisualState {

    constructor(
        private explorer: Explorer
    ) {}

    public getCellStyle(cell: ProductCell): CellStyle {

        return {

            backgroundColor: cell.isPerfectSquare
                ? 'rgba(212,175,55,0.18)'
                : undefined,

            borderColor: '#333',

            borderWidth: 1,

            textColor: '#ddd',

            showLabel: this.explorer.camera.showNumbers

        };

    }

}
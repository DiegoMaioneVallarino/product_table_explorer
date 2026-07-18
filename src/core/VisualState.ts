import { ProductCell } from '../math/ProductCell';
import { Explorer } from './Explorer';
import type { CellStyle } from '../canvas/CellStyle';

export class VisualState {

    constructor(
        private explorer: Explorer
    ) {}

    public getCellStyle(cell: ProductCell): CellStyle {

        let backgroundColor: string | undefined;

        // Números pares
        if (cell.isEven) {
            backgroundColor = 'rgba(70,130,255,0.10)';
        }

        // Cuadrados perfectos (tienen prioridad)
        if (cell.isPerfectSquare) {
            backgroundColor = 'rgba(212,175,55,0.18)';
        }

        return {

            backgroundColor,

            borderColor: '#333',

            borderWidth: 1,

            textColor: '#ddd',

            showLabel: this.explorer.camera.showNumbers

        };

    }

}
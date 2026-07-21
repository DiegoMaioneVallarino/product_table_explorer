import { ProductCell } from '../math/ProductCell';
import { Explorer } from './Explorer';
import type { CellStyle } from '../canvas/CellStyle';

export class VisualState {

    constructor(
        private explorer: Explorer
    ) {}


 

    public getCellStyle(cell: ProductCell): CellStyle {

        let backgroundColor = 'rgb(71, 64, 0)';
        let borderColor = '#333';
        let borderWidth = 1;
        let highlightColor: string | undefined;
        // Oscurecer múltiplos de acoplables
        if (
            this.explorer.numberSystem.isCoupledMultiple(
                cell.value
            )
        ) {
            backgroundColor = 'rgba(24, 24, 24, 0.45)';
        }
        
        // Iluminar filas/columnas primas
        if (
            this.explorer.primeCache.isPrime(cell.rowFactor) ||
            this.explorer.primeCache.isPrime(cell.columnFactor)
        ) {
        
            highlightColor = "rgba(255,255,255,0.06)";
        
        }
        
        // Cuadrados perfectos tienen prioridad
        if (cell.isPerfectSquare) {
            backgroundColor = 'rgba(212,175,55,0.18)';
            borderColor = '#D4AF37';
            borderWidth = 2;
        }
        
        return {

            backgroundColor,
        
            highlightColor,
        
            borderColor,
        
            borderWidth,
        
            textColor: "#ddd",
        
            showLabel: this.explorer.camera.showNumbers
        
        };

    }

}
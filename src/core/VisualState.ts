import { ProductCell } from '../math/ProductCell';
import type { Explorer } from './Explorer';
import type { CellStyle } from '../canvas/CellStyle';

const DEFAULT_BACKGROUND = 'rgb(71, 64, 0)';
const COUPLED_BACKGROUND = 'rgba(24, 24, 24, 0.45)';
const SQUARE_BACKGROUND = 'rgba(212,175,55,0.18)';
const PRIME_HIGHLIGHT = 'rgba(255,255,255,0.06)';

const COUPLED = 1;
const PRIME_LINE = 2;
const SQUARE = 4;

/**
 * Los estilos posibles son solo 8 combinaciones, así que se crean una vez
 * y `getCellStyle` devuelve siempre un objeto compartido (inmutable).
 */
const STYLES: readonly CellStyle[] = Array.from(
    { length: 8 },
    (_, flags): CellStyle => Object.freeze({

        backgroundColor:
            flags & SQUARE
                ? SQUARE_BACKGROUND
                : flags & COUPLED
                    ? COUPLED_BACKGROUND
                    : DEFAULT_BACKGROUND,

        highlightColor:
            flags & PRIME_LINE
                ? PRIME_HIGHLIGHT
                : undefined,

        borderColor:
            flags & SQUARE ? '#D4AF37' : '#333',

        borderWidth:
            flags & SQUARE ? 2 : 1,

        textColor: '#ddd'

    })
);

export class VisualState {

    constructor(
        private explorer: Explorer
    ) {}

    public getCellStyle(cell: ProductCell): CellStyle {

        const { numberSystem, primeCache } = this.explorer;

        let flags = 0;

        // Oscurecer múltiplos de acoplables
        if (numberSystem.isCoupledMultiple(cell.value)) {
            flags |= COUPLED;
        }

        // Iluminar filas/columnas primas
        if (
            primeCache.isPrime(cell.rowFactor) ||
            primeCache.isPrime(cell.columnFactor)
        ) {
            flags |= PRIME_LINE;
        }

        // Cuadrados perfectos tienen prioridad
        if (cell.isPerfectSquare) {
            flags |= SQUARE;
        }

        return STYLES[flags];

    }

}

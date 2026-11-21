/**
 * Celda (row, column) de la tabla de productos. Solo guarda las coordenadas;
 * el resto se deriva al leerlo. Es barata de crear porque el renderer crea
 * una por celda visible en cada frame.
 */
export class ProductCell {

    constructor(
        public readonly row: number,
        public readonly column: number
    ) {}

    public get rowFactor(): number {
        return this.row + 1;
    }

    public get columnFactor(): number {
        return this.column + 1;
    }

    public get value(): number {
        return (this.row + 1) * (this.column + 1);
    }

    public get isVisible(): boolean {
        return this.column <= this.row;
    }

    public get isPerfectSquare(): boolean {
        return this.row === this.column;
    }

    public get isUnit(): boolean {
        return this.value === 1;
    }

    public get isEven(): boolean {
        return this.value % 2 === 0;
    }

    public get screenLabel(): string {
        return this.value.toString();
    }

}

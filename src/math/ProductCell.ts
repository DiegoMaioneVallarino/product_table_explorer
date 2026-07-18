export class ProductCell {

    public readonly row: number;

    public readonly column: number;

    constructor(
        row: number,
        column: number
    ) {

        this.row = row;
        this.column = column;

    }

    public get rowFactor(): number {
        return this.row + 1;
    }

    public get columnFactor(): number {
        return this.column + 1;
    }

    public get value(): number {
        return this.rowFactor * this.columnFactor;
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

    public get screenLabel(): string {
        return this.value.toString();
    }
    public get isEven(): boolean {
        return this.value % 2 === 0;
    

    
    }

}
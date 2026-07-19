import { PrimeCache } from './PrimeCache';
export class ProductCell {

    public readonly row: number;
    public readonly column: number;
    
    public readonly rowFactor: number;
    public readonly columnFactor: number;
    
    public readonly value: number;
    
    public readonly isVisible: boolean;
    public readonly isPerfectSquare: boolean;
    public readonly isUnit: boolean;
    public readonly isEven: boolean;
    
    public readonly screenLabel: string;

    constructor(
        row: number,
        column: number
    ) {
    
        this.row = row;
        this.column = column;
    
        this.rowFactor = row + 1;
    
        this.columnFactor = column + 1;
    
        this.value =
            this.rowFactor *
            this.columnFactor;
    
        this.isVisible =
            column <= row;
    
        this.isPerfectSquare =
            row === column;
    
        this.isUnit =
            this.value === 1;
    
        this.isEven =
            this.value % 2 === 0;
    
        this.screenLabel =
            this.value.toString();
    }

    

}
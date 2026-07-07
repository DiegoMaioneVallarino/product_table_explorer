import { ProductCell } from './ProductCell';

export class ProductTable {

    private cells = new Map<string, ProductCell>();

    public getCell(
        row: number,
        column: number
    ): ProductCell {

        const key = `${row}:${column}`;

        let cell = this.cells.get(key);

        if (!cell) {

            cell = new ProductCell(
                row,
                column
            );

            this.cells.set(
                key,
                cell
            );

        }

        return cell;

    }

}
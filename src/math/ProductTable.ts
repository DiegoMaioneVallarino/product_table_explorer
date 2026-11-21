import { ProductCell } from './ProductCell';

/**
 * Las celdas se derivan de (row, column) con una multiplicación, así que no
 * se cachean: antes un Map con claves string crecía sin límite y asignaba un
 * string por celda en cada frame. Si necesitas igualdad, compara coordenadas.
 */
export class ProductTable {

    public getCell(
        row: number,
        column: number
    ): ProductCell {

        return new ProductCell(
            row,
            column
        );

    }

}

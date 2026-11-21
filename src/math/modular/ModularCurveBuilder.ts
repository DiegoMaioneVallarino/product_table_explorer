import { ProductCell } from "../ProductCell";
import { ProductTable } from "../ProductTable";
import { NumberSystem } from "../NumberSystem";
import { digitsOf } from "../digits";
import { ModularCurve } from "./ModularCurve";
import { ModularStep } from "./ModularStep";

export class ModularCurveBuilder {

    constructor(
        private table: ProductTable,
        private numberSystem: NumberSystem
    ) {}

    public build(
        start: ProductCell
    ): ModularCurve {

        const curve = new ModularCurve();

        const directions = [

            { row: -1, column: 0 },   // 0
            { row: -1, column: 1 },   // 1
            { row:  0, column: 1 },   // 2
            { row:  1, column: 1 },   // 3
            { row:  1, column: 0 },   // 4
            { row:  1, column:-1 },   // 5
            { row:  0, column:-1 },   // 6
            { row: -1, column:-1 }    // 7

        ];

        let current = start;

        curve.add(
            new ModularStep(
                current,
                current.value,
                0
            )
        );

        // Dígitos del valor en la base activa (antes siempre base 10).
        const digits =
            digitsOf(
                current.value,
                this.numberSystem.getBase()
            );

        for (const digit of digits) {

            const dir =
                directions[digit % 8];

            current =
                this.table.getCell(
                    current.row + dir.row,
                    current.column + dir.column
                );

            curve.add(
                new ModularStep(
                    current,
                    current.value,
                    curve.steps.length
                )
            );

        }

        return curve;

    }

}

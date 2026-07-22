import { ProductCell } from "../ProductCell";
import { ProductTable } from "../ProductTable";
import { ModularCurve } from "./ModularCurve";
import { ModularStep } from "./ModularStep";

export class ModularCurveBuilder {

    constructor(
        private table: ProductTable
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

        curve.steps.push(
            new ModularStep(
                current,
                current.value,
                0
            )
        );
        const digits =
            current.value
                .toString()
                .split("")
                .map(Number);

        for (const digit of digits) {

            const dir =
                directions[digit % 8];

            current =
                this.table.getCell(
                    current.row + dir.row,
                    current.column + dir.column
                );

                curve.steps.push(

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
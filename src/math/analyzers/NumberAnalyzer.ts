import type { ProductCell } from "../ProductCell";
import type { NumberInfo } from "./NumberInfo";

import { NumberFormatter } from "../NumberFormatter";

export class NumberAnalyzer {

    constructor(
        private numberFormatter: NumberFormatter
    ) {}

    public analyze(
        cell: ProductCell
    ): NumberInfo {

        const digits =
            this.getDigits(cell.value);

        const modularOrder =
            this.getModularOrder(digits);

        return {

            value: cell.value,

            factorA: cell.rowFactor,

            factorB: cell.columnFactor,

            modularLength:
                digits.length,

            modularProduct:
                this.getModularProduct(digits),

            modularComplexity:
                this.getModularComplexity(digits),

            modularOrder,

            modularOrderClass:
                this.getModularOrderClass(
                    modularOrder
                )

        };

    }

    private getDigits(
        value: number
    ): number[] {

        return this.numberFormatter
            .format(value)
            .split("")
            .map(symbol =>
                parseInt(
                    symbol,
                    this.numberFormatter.getBase()
                )
            );

    }

    private getModularProduct(
        digits: number[]
    ): number {

        return digits.reduce(
            (sum, digit) =>
                sum + digit,
            0
        );

    }

    private getModularComplexity(
        digits: number[]
    ): number {

        return new Set(digits).size;

    }

    private getModularOrder(
        digits: number[]
    ):
        | "Ascending"
        | "Descending"
        | "Constant"
        | "Oscillating" {

        let hasAscending = false;

        let hasDescending = false;

        for (
            let i = 1;
            i < digits.length;
            i++
        ) {

            if (
                digits[i] >
                digits[i - 1]
            ) {

                hasAscending = true;

            }
            else if (
                digits[i] <
                digits[i - 1]
            ) {

                hasDescending = true;

            }

            if (
                hasAscending &&
                hasDescending
            ) {

                return "Oscillating";

            }

        }

        if (
            !hasAscending &&
            !hasDescending
        ) {

            return "Constant";

        }

        if (hasAscending) {

            return "Ascending";

        }

        return "Descending";

    }

    private getModularOrderClass(
        order:
            | "Ascending"
            | "Descending"
            | "Constant"
            | "Oscillating"
    ):
        | "asc"
        | "desc"
        | "const"
        | "osc" {

        switch (order) {

            case "Ascending":
                return "asc";

            case "Descending":
                return "desc";

            case "Constant":
                return "const";

            case "Oscillating":
                return "osc";

        }

    }

}
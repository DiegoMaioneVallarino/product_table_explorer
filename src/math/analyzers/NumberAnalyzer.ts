import type { ProductCell } from "../ProductCell";
import type { NumberInfo } from "./NumberInfo";

export class NumberAnalyzer {

   public analyze(
    cell: ProductCell
): NumberInfo {

    return {

    value: cell.value,

    factorA: cell.rowFactor,

    factorB: cell.columnFactor,

    modularLength:
        this.getModularLength(cell.value),

    modularProduct:
        this.getModularProduct(cell.value),

    modularComplexity:
        this.getModularComplexity(cell.value),

    modularOrder:
        this.getModularOrder(cell.value),

    modularOrderClass:
        this.getModularOrderClass(cell.value)

};

}

    private getDigits(
        value: number
    ): number[] {

        return value
            .toString()
            .split("")
            .map(Number);

    }

    private getModularLength(
        value: number
    ): number {

        return this.getDigits(value).length;

    }

    private getModularProduct(
        value: number
    ): number {

        return this.getDigits(value).reduce(

            (sum, digit) =>

                sum + digit,

            0

        );

    }

    private getModularComplexity(
        value: number
    ): number {

        return new Set(

            this.getDigits(value)

        ).size;

    }

    private getModularOrder(
        value: number
    ): "Ascending"
      | "Descending"
      | "Constant"
      | "Oscillating" {

        const digits =
            this.getDigits(value);

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
    value: number
): "asc" | "desc" | "const" | "osc" {

    switch (this.getModularOrder(value)) {

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
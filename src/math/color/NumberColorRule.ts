import { NumberSystem } from "../NumberSystem";

export class NumberColorRule {

    constructor(
        private readonly numberSystem: NumberSystem
    ) {}

    public getColor(
        value: number
    ): string | undefined {

        const base =
            this.numberSystem.getBase();

        const digit =
            ((value % base) + base) % base;

        switch (digit) {

            case 0:
                return "#ffffff";

            case 1:
                return "#0069ff";

            case 2:
                return "#ff00f1";

            case 3:
                return "#8cff66";

            case 4:
                return "#ff0000";

            case 5:
                return "#6200ff";

            case 6:
                return "#00ffff";

            case 7:
                return "#fff100";

            case 8:
                return "#ff8c00";

            case 9:
                return "#006b2e";

            default:
                return undefined;

        }

    }

}
import { NumberSystem } from "./NumberSystem";

export class NumberFormatter {

    constructor(
        private numberSystem: NumberSystem
    ) {}

    public format(
        value: number
    ): string {

        return value.toString(
            this.numberSystem.getBase()
        ).toUpperCase();

    }

    public getBase(): number {

    return this.numberSystem.getBase();

}

}
export class NumberSystem {

    private base = 10;

    private coupledNumbers: number[] = [];

    constructor() {

        this.rebuild();

    }

    public setBase(base: number): void {

        this.base = base;

        this.rebuild();

    }

    private rebuild(): void {

        this.coupledNumbers = [];

        for (let n = 2; n < this.base; n++) {

            if (this.base % n === 0) {

                this.coupledNumbers.push(n);

            }

        }

    }

    public getCoupledNumbers(): readonly number[] {

        return this.coupledNumbers;

    }

    public isCoupledMultiple(value: number): boolean {

        for (const coupled of this.coupledNumbers) {

            if (value % coupled === 0) {

                return true;

            }

        }

        return false;

    }

}
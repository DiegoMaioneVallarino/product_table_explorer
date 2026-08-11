export class NumberSystem {

    private base = 10;

    private coupledNumbers: number[] = [];

private listeners = new Set<() => void>();

    constructor() {

        this.rebuild();

    }

    public getBase(): number {

        return this.base;

    }

    public setBase(base: number): void {

    if (base === this.base) {
        return;
    }

    this.base = base;

    this.rebuild();

    this.notify();

}



    public onChange(
        listener: () => void
    ): () => void {

        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };

    }

    private notify(): void {

    for (const listener of this.listeners) {
        listener();
    }

}

    private rebuild(): void {

        this.coupledNumbers = [];

        for (
            let n = 2;
            n < this.base;
            n++
        ) {

            if (
                this.base % n === 0
            ) {

                this.coupledNumbers.push(n);

            }

        }

    }

    public getCoupledNumbers():
        readonly number[] {

        return this.coupledNumbers;

    }

    public isCoupledMultiple(
        value: number
    ): boolean {

        for (
            const coupled
            of this.coupledNumbers
        ) {

            if (
                value % coupled === 0
            ) {

                return true;

            }

        }

        return false;

    }

}



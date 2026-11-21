import type { TableFunction } from "./TableFunction";
import type { NumberSystem } from "../NumberSystem";

export class FunctionEngine {

    private function?: TableFunction;

    private listeners =
        new Set<() => void>();

    constructor(
        private readonly numberSystem: NumberSystem
    ) {}

    public setFunction(
        fn: TableFunction
    ): void {

        this.function = fn;

        this.notify();

    }

    public evaluate(
        value: number
    ): number {

        if (!this.function) {

            return value;

        }

        return this.function(
            value,
            this.numberSystem.getBase()
        );

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

        for (
            const listener
            of this.listeners
        ) {

            listener();

        }

    }

}

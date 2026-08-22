import type { TableFunction } from "./TableFunction";
export function nearestBoundary(
    value: number
): number {
   return Math.abs(value)
        .toString()
        .split('')
        .reduce((sum, char) => sum + Number(char), 0)
}
export class FunctionEngine {

    private function?: (
        x: number
    ) => number;

    private listeners =
        new Set<() => void>();


    public setFunction(
        fn: (x: number) => number
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

        return this.function(value);

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
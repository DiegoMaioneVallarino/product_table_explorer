import type { TableFunction } from "./TableFunction";
export function nearestBoundary(
    value: number
): number {
    const sqrt = Math.sqrt(value)

    let decimalPart = sqrt - Math.floor(sqrt)
    let nearest = 0
    if(decimalPart <= .5){
        nearest=Math.floor(sqrt)
    }else{
        nearest=Math.ceil(sqrt)
    }

    return nearest

}
export class FunctionEngine {

    private currentFunction?: TableFunction;

    private listeners =
        new Set<() => void>();

    public setFunction(
        fn: TableFunction
    ): void {

        this.currentFunction = fn;

        this.notify();

    }

    public clearFunction(): void {

        this.currentFunction =
            undefined;

        this.notify();

    }

    public hasFunction(): boolean {

        return this.currentFunction !== undefined;

    }

    public evaluate(
        value: number
    ): number {

        if (!this.currentFunction) {
            return value;
        }

        return this.currentFunction(value);

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

    

}
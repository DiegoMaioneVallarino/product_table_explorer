export class BaseSystem {

    private base = 10;

    private listeners =
        new Set<() => void>();

    public get current(): number {
        return this.base;
    }

    public setBase(base: number): void {

        if (base < 2 || base > 36) {
            return;
        }

        if (base === this.base) {
            return;
        }

        this.base = base;

        this.notify();
    }

    public increase(): void {

        this.setBase(
            this.base + 1
        );

    }

    public decrease(): void {

        this.setBase(
            this.base - 1
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

        for (const listener of this.listeners) {
            listener();
        }

    }

    public format(
        value: number
    ): string {

        return value.toString(
            this.base
        ).toUpperCase();

    }

}
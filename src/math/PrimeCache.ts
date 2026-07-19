export class PrimeCache {

    private readonly primes = new Set<number>();

    public loadFromText(text: string): void {

        const numbers = text
            .split(/\s+/)
            .map(v => Number(v))
            .filter(v => Number.isInteger(v) && v > 1);

        for (const p of numbers) {
            this.primes.add(p);
        }

    }

    public isPrime(n: number): boolean {
        return this.primes.has(n);
    }

}
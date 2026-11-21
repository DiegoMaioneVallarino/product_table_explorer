import { ModularStep } from "./ModularStep";
import { ProductCell } from "../ProductCell";

// Las filas razonables caben de sobra en 2^26; la clave es única mientras column < 2^26.
const KEY_STRIDE = 2 ** 26;

export class ModularCurve {

    public readonly steps: ModularStep[] = [];

    private readonly keys = new Set<number>();

    public add(step: ModularStep): void {

        this.steps.push(step);

        this.keys.add(
            step.cell.row * KEY_STRIDE +
            step.cell.column
        );

    }

    public contains(
        cell: ProductCell
    ): boolean {

        // Camino rápido O(1); la comprobación por coordenadas descarta colisiones.
        if (!this.keys.has(cell.row * KEY_STRIDE + cell.column)) {
            return false;
        }

        return this.steps.some(
            step =>
                step.cell.row === cell.row &&
                step.cell.column === cell.column
        );

    }

}

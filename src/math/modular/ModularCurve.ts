import { ModularStep } from "./ModularStep";
import { ProductCell } from "../ProductCell";

export class ModularCurve {

    public steps: ModularStep[] = [];

    public contains(
        cell: ProductCell
    ): boolean {

        return this.steps.some(
            step => step.cell === cell
        );

    }

}
import { ProductCell } from "../ProductCell";
export class ModularStep {

    constructor(

        public readonly cell: ProductCell,

        public readonly value: number,

        public readonly index: number

    ) {}

}
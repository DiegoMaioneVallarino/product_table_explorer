import { ProductCell } from "../ProductCell";

export class ProductPathNode {

    public readonly children: ProductPathNode[] = [];

    constructor(
        public readonly cell: ProductCell
    ) {}

}
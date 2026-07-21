import { ProductPathNode } from "./ProductPathNode";

export class ProductPath {

    public root?: ProductPathNode;

    public clear(): void {

        this.root = undefined;

    }

}
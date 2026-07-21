import { ProductCell } from "../ProductCell";
import { ProductTable } from "../ProductTable";
import { ProductPath } from "./ProductPath";
import { ProductPathNode } from "./ProductPathNode";

export class ProductPathBuilder {

    constructor(
        private table: ProductTable
    ) {}

    public build(
        start: ProductCell,
        steps: number
    ): ProductPath {
    
        const path = new ProductPath();
    
        const root = new ProductPathNode(start);
    
        path.root = root;
    
        const neighbors =
            this.getClosestNeighbors(start);
    
        for (const neighbor of neighbors) {
    
            root.children.push(
                new ProductPathNode(neighbor)
            );
    
        }
    
        return path;
    
    }

    private getClosestNeighbors(
        cell: ProductCell
    ): ProductCell[] {
    
        const neighbors: ProductCell[] = [];
    
        let bestDistance = Number.MAX_SAFE_INTEGER;
    
        for (
            let row = cell.row - 1;
            row <= cell.row + 1;
            row++
        ) {
    
            for (
                let column = cell.column - 1;
                column <= cell.column + 1;
                column++
            ) {
    
                if (
                    row === cell.row &&
                    column === cell.column
                ) {
                    continue;
                }
    
                if (
                    row < 0 ||
                    column < 0
                ) {
                    continue;
                }
    
                const neighbor = this.table.getCell(
                    row,
                    column
                );
    
                if (!neighbor.isVisible) {
                    continue;
                }
    
                const distance = Math.abs(
                    neighbor.value -
                    cell.value
                );
    
                if (distance < bestDistance) {
    
                    bestDistance = distance;
    
                    neighbors.length = 0;
    
                    neighbors.push(neighbor);
    
                }
                else if (distance === bestDistance) {
    
                    neighbors.push(neighbor);
    
                }
    
            }
    
        }
    
        return neighbors;
    
    }

   

}
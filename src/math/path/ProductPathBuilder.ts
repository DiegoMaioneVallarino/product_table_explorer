import { ProductCell } from "../ProductCell";
import { ProductTable } from "../ProductTable";
import { ProductPath } from "./ProductPath";
import { ProductPathNode } from "./ProductPathNode";

export class ProductPathBuilder {
    private pending: ProductPathNode[] = [];
    constructor(
        private table: ProductTable
    ) {}

    
    public start(
        start: ProductCell
    ): ProductPath {
    
        const path = new ProductPath();
    
        const root = new ProductPathNode(start);
    
        path.root = root;
    
        this.pending = [root];
    
        return path;
    
    }

    public step(): void {

        const node = this.pending.shift();
    
        if (!node) {
            return;
        }
    
        const neighbors =
            this.getClosestNeighbors(
                node.cell
            );
    
        for (const neighbor of neighbors) {
    
            const child =
                new ProductPathNode(
                    neighbor
                );
    
            node.children.push(child);
    
            this.pending.push(child);
    
        }
    
    }

    public isFinished(): boolean {

        return this.pending.length === 0;
    
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
    
                if (
                    neighbor.value >=
                    cell.value
                ) {
                    continue;
                }
                
                const distance =
                    cell.value -
                    neighbor.value;
    
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
        console.log(
            "Centro:",
            cell.value,
            neighbors.map(n => n.value)
        );
        return neighbors;
    
    }

   

}
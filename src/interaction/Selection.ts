import { ProductCell } from "../math/ProductCell";
import { ProductTable } from "../math/ProductTable";


export class Selection {

    private selectedRow = -1;
    private selectedColumn = -1;

    private hoverRow = -1;
    private hoverColumn = -1;

    private listeners = new Set<() => void>();

    public onChange(listener: () => void): () => void {

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

    public select(row: number, column: number): void {

        this.selectedRow = row;
        this.selectedColumn = column;

        this.notify();

    }

    public hover(row: number, column: number): void {

        this.hoverRow = row;
        this.hoverColumn = column;

        this.notify();

    }

    public clearSelection(): void {

        this.selectedRow = -1;
        this.selectedColumn = -1;

        this.notify();

    }

    public clearHover(): void {

        this.hoverRow = -1;
        this.hoverColumn = -1;

        this.notify();

    }

    public getSelectedRow(): number {
        return this.selectedRow;
    }

    public getSelectedColumn(): number {
        return this.selectedColumn;
    }

    public getHoverRow(): number {
        return this.hoverRow;
    }

    public getHoverColumn(): number {
        return this.hoverColumn;
    }

    public hasSelection(): boolean {
        return this.selectedRow >= 0;
    }
    public getSelectedCell(
        table: ProductTable
    ): ProductCell | undefined {
    
        if (!this.hasSelection()) {
            return;
        }
    
        return table.getCell(
            this.selectedRow,
            this.selectedColumn
        );
    
    }
}


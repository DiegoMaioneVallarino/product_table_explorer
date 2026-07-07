import { Camera } from '../canvas/Camera';
import { Selection } from '../interaction/Selection';
import { ProductTable } from '../math/ProductTable';

export class Explorer {

    public readonly camera: Camera;

    public readonly selection: Selection;

    public readonly table: ProductTable;

    constructor() {

        this.camera = new Camera();

        this.selection = new Selection();

        this.table = new ProductTable();

    }

}
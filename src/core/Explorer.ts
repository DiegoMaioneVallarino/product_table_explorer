import { Camera } from '../canvas/Camera';
import { Selection } from '../interaction/Selection';
import { ProductTable } from '../math/ProductTable';
import { VisualState } from './VisualState';
import { NumberSystem } from "../math/NumberSystem";

export class Explorer {

    public readonly camera: Camera;

    public readonly selection: Selection;

    public readonly table: ProductTable;
    public readonly visual: VisualState;
    public readonly numberSystem: NumberSystem;
   constructor() {

    this.camera = new Camera();

    this.selection = new Selection();

    this.table = new ProductTable();

    this.visual = new VisualState(this);
    this.numberSystem = new NumberSystem();
}

}
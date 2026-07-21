import { Camera } from '../canvas/Camera';
import { Selection } from '../interaction/Selection';
import { ProductTable } from '../math/ProductTable';
import { VisualState } from './VisualState';
import { NumberSystem } from "../math/NumberSystem";
import { PrimeCache } from '../math/PrimeCache';
import { ProductPath } from "../math/path/ProductPath";
import { ProductPathBuilder } from "../math/path/ProductPathBuilder";
import { ProductCell } from "../math/ProductCell";

export class Explorer {

    public readonly camera: Camera;

    public readonly selection: Selection;
    public  path: ProductPath;

    public readonly pathBuilder: ProductPathBuilder;
    public readonly table: ProductTable;
    public readonly visual: VisualState;
    public readonly numberSystem: NumberSystem;
    public readonly primeCache: PrimeCache;
    public buildPath(
        cell: ProductCell
    ): void {
    
        this.path =
            this.pathBuilder.start(
                cell
            );
    
    }
   constructor() {

    this.camera = new Camera();

    this.selection = new Selection();

    this.table = new ProductTable();

    this.visual = new VisualState(this);
    this.numberSystem = new NumberSystem();
    this.primeCache = new PrimeCache();
    this.path = new ProductPath();

this.pathBuilder = new ProductPathBuilder(
    this.table
);
}

}
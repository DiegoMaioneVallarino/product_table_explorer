import { Camera } from "../canvas/Camera";
import { Selection } from "../interaction/Selection";

import { ProductTable } from "../math/ProductTable";
import { ProductCell } from "../math/ProductCell";

import { ProductPath } from "../math/path/ProductPath";
import { ProductPathBuilder } from "../math/path/ProductPathBuilder";

import { ModularCurve } from "../math/modular/ModularCurve";
import { ModularCurveBuilder } from "../math/modular/ModularCurveBuilder";

import { VisualState } from "./VisualState";
import { NumberSystem } from "../math/NumberSystem";
import { PrimeCache } from "../math/PrimeCache";
import { NumberAnalyzer } from "../math/analyzers/NumberAnalyzer";

import { NumberFormatter } from "../math/NumberFormatter";

export class Explorer {

    public readonly camera: Camera;

    public readonly selection: Selection;

    public readonly table: ProductTable;

    public readonly visual: VisualState;

    public readonly numberSystem: NumberSystem;

    public readonly primeCache: PrimeCache;

    public readonly pathBuilder: ProductPathBuilder;

    public readonly modularCurveBuilder: ModularCurveBuilder;
    
    public readonly numberAnalyzer: NumberAnalyzer;
    
    public readonly numberFormatter: NumberFormatter;

    public path = new ProductPath();

    public modularCurve = new ModularCurve();

    constructor() {

        this.camera = new Camera();

        this.selection = new Selection();

        this.table = new ProductTable();

        this.visual = new VisualState(this);

        this.numberSystem = new NumberSystem();

        this.primeCache = new PrimeCache();
        
        this.numberFormatter =
    new NumberFormatter(
        this.numberSystem
    );

this.numberAnalyzer =
    new NumberAnalyzer(
        this.numberFormatter
    );
        this.pathBuilder =
            new ProductPathBuilder(
                this.table
            );

        this.modularCurveBuilder =
            new ModularCurveBuilder(
                this.table
            );

    }

    public buildPath(
    cell: ProductCell
): void {

    this.path =
        this.pathBuilder.start(
            cell
        );

}

public buildModularCurve(
    cell: ProductCell
): void {

    this.modularCurve =
        this.modularCurveBuilder.build(
            cell
        );

}

    

}
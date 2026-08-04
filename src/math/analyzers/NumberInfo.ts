export interface NumberInfo {

    value: number;

    factorA: number;
    factorB: number;


    modularLength: number;

    modularProduct: number;

    modularComplexity: number;

    modularOrder:
        | "Ascending"
        | "Descending"
        | "Constant"
        | "Oscillating";

    modularOrderClass:
    "asc"
    | "desc"
    | "const"
    | "osc";

}
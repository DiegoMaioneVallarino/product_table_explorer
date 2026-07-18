import { ProductCell } from '../math/ProductCell';
import { Explorer } from './Explorer';
import type { CellStyle } from '../canvas/CellStyle';

export class VisualState {

    constructor(
        private explorer: Explorer
    ) {}


 

    public getCellStyle(cell: ProductCell): CellStyle {

        let backgroundColor = "rgb(71, 64, 0)";

        if (
            this.explorer.numberSystem.isCoupledMultiple(
                cell.value
            )
        ) {
        
            backgroundColor = "rgba(20,20,20,0.45)";
        
        }
        
        if (cell.isPerfectSquare) {
        
            backgroundColor = "rgb(75, 75, 75)";
        
        }

        

       
        return {

            backgroundColor,

            borderColor: '#333',

            borderWidth: 1,

            textColor: '#ddd',

            showLabel: this.explorer.camera.showNumbers

        };

    }

}
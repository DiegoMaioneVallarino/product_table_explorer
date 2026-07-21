import './Workspace.css';

import { useMemo } from 'react';

import { Explorer } from '../../core/Explorer';


import AxisTop from './AxisTop/AxisTop';
import AxisLeft from './AxisLeft/AxisLeft';
import GridCanvas from "./GridCanvas/GridCanvas";
import OverlayCanvas from "./OverlayCanvas/OverlayCanvas";
function Workspace() {

    const explorer = useMemo(() => {

        const ex = new Explorer();
    
        ex.primeCache.loadFromText(`
            2 3 5 7 11 13 17 19 23 29
            31 37 41 43 47 53 59 61
        `);
    
        return ex;
    
    }, []);
    const handleSeePath = (): void => {

        if (!explorer.selection.hasSelection()) {
            return;
        }
    
        const cell = explorer.table.getCell(
    
            explorer.selection.getSelectedRow(),
            explorer.selection.getSelectedColumn()
    
        );
    
        explorer.buildPath(cell);
        console.log(explorer.path);
    
    };
    
    return (
    <div className="workspace">
        <div className="overWorkspace">
        <div className="numberDataArea">
            <div className="numberShow">333</div>
            </div>
            <div className="numberActionArea">
                <div className="seePathBt NumberpanelBt" onClick={handleSeePath}>See path</div>
                <div className="seeModularCurveBt NumberpanelBt">See mod curve</div>
                </div>
        </div>
        <div className="innerWorkspace" >
            <div className="corner" />

            <AxisTop explorer={explorer} />

            <AxisLeft explorer={explorer} />

            <div className="canvas-container">

<GridCanvas explorer={explorer} />

<OverlayCanvas explorer={explorer} />

</div>
        </div> 
        </div> 
    );

}

export default Workspace;
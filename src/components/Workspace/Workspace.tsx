import './Workspace.css';

import { useMemo } from 'react';

import { Explorer } from '../../core/Explorer';


import AxisTop from './AxisTop/AxisTop';
import AxisLeft from './AxisLeft/AxisLeft';
import NumberCanvas from './NumberCanvas/NumberCanvas';

function Workspace() {

    const explorer = useMemo(() => {

        const ex = new Explorer();
    
        ex.primeCache.loadFromText(`
            2 3 5 7 11 13 17 19 23 29
            31 37 41 43 47 53 59 61
        `);
    
        return ex;
    
    }, []);
    return (
    <div className="workspace">
        <div className="overWorkspace"></div>
        <div className="innerWorkspace" >
            <div className="corner" />

            <AxisTop explorer={explorer} />

            <AxisLeft explorer={explorer} />

            <NumberCanvas explorer={explorer} />

        </div> 
        </div> 
    );

}

export default Workspace;
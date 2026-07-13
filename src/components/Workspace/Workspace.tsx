import './Workspace.css';

import { useMemo } from 'react';

import { Explorer } from '../../core/Explorer';


import AxisTop from './AxisTop/AxisTop';
import AxisLeft from './AxisLeft/AxisLeft';
import NumberCanvas from './NumberCanvas/NumberCanvas';

function Workspace() {

    const explorer = useMemo(
        () => new Explorer(),
        []
    );
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
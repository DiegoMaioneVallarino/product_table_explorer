import './Workspace.css';

import { useMemo } from 'react';

import { Camera } from '../../canvas/Camera';

import AxisTop from './AxisTop/AxisTop';
import AxisLeft from './AxisLeft/AxisLeft';
import NumberCanvas from './NumberCanvas/NumberCanvas';

function Workspace() {

    const camera = useMemo(() => new Camera(), []);

    return (
        <div className="workspace">

            <div className="corner" />

            <AxisTop camera={camera} />

            <AxisLeft camera={camera} />

            <NumberCanvas camera={camera} />

        </div>
    );

}

export default Workspace;
import { Camera } from '../../../canvas/Camera';

interface AxisLeftProps {
    camera: Camera;
}

function AxisLeft({ camera }: AxisLeftProps) {

    return (
        <div className="axis-left"></div>
    );

}

export default AxisLeft;
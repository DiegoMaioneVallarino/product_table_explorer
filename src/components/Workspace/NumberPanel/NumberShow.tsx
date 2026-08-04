import type { NumberInfo } from "../../../math/analyzers/NumberInfo";

interface NumberShowProps {

    info?: NumberInfo;

}
function NumberShow({

    info

}: NumberShowProps) {

    return (

        <div
            className={`numberShow ${info?.modularOrderClass ?? ""}`}
        >

            {info?.value ?? "-"}

        </div>

    );

}

export default NumberShow;
import type { NumberInfo } from "../../../math/analyzers/NumberInfo";

interface NumberShowProps {

    info?: NumberInfo;

}
function NumberShow({

    info

}: NumberShowProps) {

    return (
  <div  className="NumberShowArea">
    <div className="modularWeight">{info?.modularProduct}</div>
        <div
        
            className={`numberShow ${info?.modularOrderClass ?? ""}`}
        >

            {info?.value ?? "-"}

        </div>
 </div>
    );

}

export default NumberShow;
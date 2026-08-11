import type { NumberInfo } from "../../../math/analyzers/NumberInfo";
import { Explorer } from "../../../core/Explorer";

interface NumberShowProps {

    info?: NumberInfo;

    explorer: Explorer;

}

function NumberShow({

    info,
    explorer

}: NumberShowProps) {

    return (

        <div
            className={
                `numberShow ${
                    info?.modularOrderClass ?? ""
                }`
            }
        >

            {info
                ? explorer.numberFormatter.format(
                    info.value
                )
                : "-"
            }

        </div>

    );

}

export default NumberShow;
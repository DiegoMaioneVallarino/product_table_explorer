import { useEffect, useState } from "react";

import { Explorer } from "../../../core/Explorer";

interface NumberPanelProps {

    explorer: Explorer;

}

function NumberPanel({

    explorer

}: NumberPanelProps) {

    const [, setVersion] = useState(0);

    useEffect(() => {

        return explorer.selection.onChange(() => {

            setVersion(v => v + 1);

        });

    }, [explorer]);

    const cell =
        explorer.selection.getSelectedCell(
            explorer.table
        );

    return (

        <div className="numberDataArea">

            <div className="numberShow">

                {cell?.value ?? "-"}

            </div>

            <div>

                {cell
                    ? `${cell.rowFactor} × ${cell.columnFactor}`
                    : ""}

            </div>

        </div>

    );

}

export default NumberPanel;
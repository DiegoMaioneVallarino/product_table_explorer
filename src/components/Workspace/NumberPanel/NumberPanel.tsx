import { useEffect, useState } from "react";

import { Explorer } from "../../../core/Explorer";

import type { NumberInfo } from "../../../math/analyzers/NumberInfo";

import NumberShow from "./NumberShow";
import NumberFactors from "./NumberFactors";
import NumberProperties from "./NumberProperties";

interface NumberPanelProps {

    explorer: Explorer;

}

function NumberPanel({

    explorer

}: NumberPanelProps) {

    const [info, setInfo] =
        useState<NumberInfo>();

  useEffect(() => {

    const update = (): void => {

        const cell =
            explorer.selection.getSelectedCell(
                explorer.table
            );

        setInfo(
            cell
                ? explorer.numberAnalyzer.analyze(cell)
                : undefined
        );

    };

    update();

    const unsubscribeSelection =
        explorer.selection.onChange(update);

    const unsubscribeNumberSystem =
        explorer.numberSystem.onChange(update);

    return () => {

        unsubscribeSelection();
        unsubscribeNumberSystem();

    };

}, [explorer]);

    return (

        <div className="numberDataArea">

            <NumberFactors
                info={info}
            />

            <NumberShow
    info={info}
    explorer={explorer}
/>

            <NumberProperties
                info={info}
            />

        </div>

    );

}

export default NumberPanel;
import type { NumberInfo } from "../../../math/analyzers/NumberInfo";

interface NumberFactorsProps {

    info?: NumberInfo;

}

function NumberFactors({

    info

}: NumberFactorsProps) {

    return (

        <div className="numberFactors">

            {

                info &&

                <>

                    <span>

                        {info.factorA}

                    </span>

                    <span>

                        ×

                    </span>

                    <span>

                        {info.factorB}

                    </span>

                </>

            }

        </div>

    );

}

export default NumberFactors;
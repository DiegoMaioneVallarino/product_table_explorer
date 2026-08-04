import type { NumberInfo } from "../../../math/analyzers/NumberInfo";

interface NumberPropertiesProps {

    info?: NumberInfo;

}

function NumberProperties({

    info

}: NumberPropertiesProps) {

    if (!info) {

        return null;

    }

    return (

        <div className="numberProperties">

            <div className="numberProperty">

                <span></span>

                <span>{info.modularLength}</span>

            </div>

            <div className="numberProperty">

                <span></span>

                <span>{info.modularProduct}</span>

            </div>

            <div className="numberProperty">

                <span></span>

                <span>

                    {info.modularComplexity}/10

                </span>

            </div>

            <div className="numberProperty">

                <span></span>

                <span>

                    {info.modularOrder}

                </span>

            </div>

        </div>

    );

}

export default NumberProperties;
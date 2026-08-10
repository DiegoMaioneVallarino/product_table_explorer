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

                <div className="numberProperty modularLength" >{info.modularLength}</div>

            </div>

           

            <div className="numberProperty">

                <span></span>

                <span>

                    {info.modularComplexity}/10

                </span>

            </div>

            <div className="numberProperty">

                <span>Order</span>

                <span>

                    {info.modularOrder}

                </span>

            </div>

        </div>

    );

}

export default NumberProperties;
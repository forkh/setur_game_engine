import {ReactNode} from "react";
import {render} from "react-dom";

function renderer(id: string): ReactNode {
    return <div id={id}>

    </div>
}

export {renderer};
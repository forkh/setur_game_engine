import React from "react";
import {ReactNode} from "react";
import {render} from "react-dom";
import {ImageMap} from './ResourceManager';

function renderer(sprites: ImageMap): ReactNode {
    let prop1: testprop = {
        x: 0,
        y: 0,
        src: ""
    }
    for (let key in sprites) {
        prop1.src = sprites[key].src;
        testhey(prop1);
    }

    return (<div>{testhey(prop1)}</div>);
}

function testhey(prp: testprop) {
    return React.createElement("img", {...prp});
    //return React.createElement("img", {src: "/assets/images/bird.png"});
}

type testprop = {
    src: string,
    x: number,
    y: number
}

function renderObject(proppy: testprop): ReactNode {
    const img: ReactNode = React.createElement("img", [proppy.src, proppy.x, proppy.y]);
    //return img;
    return <div></div>
}

export {renderer, renderObject, testhey};
export type {testprop};
import {useRef} from "react";

class HitboxRectangle{
    private x : number;
    private y : number;
    private width : number;
    private height : number;
    private canvasRef = useRef(null);

    constructor (x = 0, y = 0, width = 5, height = 5) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    private drawRectangle(x:number, y:number, width:number, height:number) {
        const canvas = this.canvasRef.current
        const rectangle = canvas.getContext("2d");
        rectangle.beginPath();
        rectangle.rect(x, y, height, width);
        rectangle.stroke();
        return {x, y, height, width}
    }

}

export default HitboxRectangle;

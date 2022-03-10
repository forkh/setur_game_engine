
class HitboxRectangle{
    private x : number;
    private y : number;
    private width : number;
    private height : number;

    constructor (x = 0, y = 0, width = 5, height = 5) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }

}

export default HitboxRectangle;

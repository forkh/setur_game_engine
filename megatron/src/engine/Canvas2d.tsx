
class Canvas2d {
    private static instance: Canvas2d;

    private constructor() {

    };

    public static instantiateCanvas2d(): void {
        if (!Canvas2d.instance) {
            Canvas2d.instance = new Canvas2d();
        }
    }



};

export {Canvas2d};
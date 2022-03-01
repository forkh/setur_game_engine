import {ReactNode} from "react";
//import {GameComponent} from "../gameobject/GameComponent";
import {Vector2d} from "./math";


/**
 * klassin extendar gameObject hjá Jóhann
 */
export class TextRenderer {

    public text: string = "Hello World";

    public Render(position: Vector2d, rotation: number): ReactNode {
        return <p style={{
            position: "absolute",
            transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`
        }}>{this.text}</p>
    }
}
/*
 * Based partially upon example:
 * https://github.com/suuunly/react-sheep-engine-2/blob/main/src/react-sheep-engine/input/InputSystem.ts
 */

type InputTriggerMap = {
    [code: string]: (() => void);
}

class InputSystem {
    private static instance: InputSystem;

    private readonly triggers: InputTriggerMap;

    private constructor(map: InputTriggerMap) {
        document.addEventListener("keydown", this.buttonPressed.bind(this));
        this.triggers = {};

        for (let k in map) {
            this.triggers[k] = map[k];
        }
    }

    public static initInputSystem(map: InputTriggerMap): void {
        InputSystem.instance = new InputSystem(map);
    }

    private buttonPressed(e: any) : void {
        for (let k in this.triggers) {
            if (k === e.code) {
                this.triggers[k]();
                return;
            }

        }

        console.log(e.code + " is not bound to anything.");
    }
}

export { InputSystem };
export type { InputTriggerMap };
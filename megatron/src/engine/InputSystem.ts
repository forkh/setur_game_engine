/*
 * Based partially upon example:
 * https://github.com/suuunly/react-sheep-engine-2/blob/main/src/react-sheep-engine/input/InputSystem.ts
 */

/**
 * Type of object. Used to store mappign between keycode and function that is executed.
 */
type InputTriggerMap = {
    [code: string]: (() => void);
}

/**
 * InputSystem class
 */
class InputSystem {
    private static instance: InputSystem;

    private readonly triggers: InputTriggerMap;

    /**
     * Constructor. Takes a object that contains mappings between keycodes and associated function to be executed.
     * @param map
     * @private
     */
    private constructor(map: InputTriggerMap) {
        document.addEventListener("keydown", this.buttonPressed.bind(this));
        this.triggers = {};

        for (let k in map) {
            this.triggers[k] = map[k];
        }
    }

    /**
     * Instantiates InputSystem singleton
     * @param map
     */
    public static instantiateInputSystem(map: InputTriggerMap): void {
        InputSystem.instance = new InputSystem(map);
    }

    /**
     * Checks if pressed button exists in object, if so execute associated function
     * @param e
     * @private
     */
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

// Exports
export { InputSystem };
export type { InputTriggerMap };
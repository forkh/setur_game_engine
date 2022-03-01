// Inspired heavily by:
// https://github.com/suuunly/react-sheep-engine-2

type InputMap = {
    [key: string]: string | number;
}

type InputTriggerMap = {
    [code: string]: (() => void)[];
}

enum EventType {
    ButtonDown,
    ButtonUp
}

class InputSystem {
    // Singleton instance variable
    private static instance: InputSystem;

    private buttonDownTriggers: InputTriggerMap;
    private buttonUpTriggers: InputTriggerMap;

    private constructor(private readonly maps: InputMap) {
        document.addEventListener("keydown", this.onButtonDown.bind(this));
        document.addEventListener("keydown", this.onButtonUp.bind(this));
        this.buttonDownTriggers = {};
        this.buttonUpTriggers = {};
    }

    public static instantiateInputSystem(map: InputMap) {
        if (!InputSystem.instance) {
            InputSystem.instance = new InputSystem(map);
        }
    }

    public static addButtonListener(eventType: EventType, key: string, onTriggered: () => void) {
        InputSystem.instance.registerButtonListener(key, onTriggered, eventType);
    }

    private registerButtonListener(key: string, onTriggered: () => void, eventType: EventType) {
        var buttonArray: InputTriggerMap;

        switch (eventType) {
            case EventType.ButtonDown:
                buttonArray = this.buttonDownTriggers;
                break;
            case EventType.ButtonUp:
                buttonArray = this.buttonUpTriggers;
                break;
        }

        const code = this.maps[key];
        if (!code) {
            console.warn(`Failed to find map for key: ${key}`);
            return;
        }

        if (!buttonArray[code]) {
            buttonArray = {...buttonArray, [code]: []}
        }

        let triggers = buttonArray[code];
        triggers.push(onTriggered);
    }

    private onButtonDown(e: any) {
        for (const [code, triggers] of Object.entries(this.buttonDownTriggers)) {
            if (e.code === code || e.keyCode === code) {
                triggers.forEach(trigger => trigger());
                break;
            }
        }
    }

    private onButtonUp(e: any) {
        for (const [code, triggers] of Object.entries(this.buttonUpTriggers)) {
            if (e.code === code || e.keyCode === code) {
                triggers.forEach(trigger => trigger());
                break;
            }
        }
    }
}

export type {InputMap, InputTriggerMap};
export {InputSystem};
import { ResourceManager } from './ResourceManager';
import { ReactNode } from 'react';

class AudioSystem {
    private static instance: AudioSystem;
    public static channels: HTMLAudioElement[];

    private constructor() {
        AudioSystem.channels = [];
    }

    public static instantiateAudioSystem(): void {
        if (!AudioSystem.instance) {
            AudioSystem.instance = new AudioSystem();
        }
    }

    public static play2() {
        AudioSystem.channels[0].play();
    }

    public static play(soundid: string): ReactNode {
        AudioSystem.channels[0] = ResourceManager.getAudio(soundid);

        return (
            <div id={"0"}>
                <button onClick={this.play2} >Play</button>
                <audio autoPlay loop>
                    <source src={this.channels[0].src} type={"audio/wav"}></source>
                </audio>
            </div>
        );
    }
}

export {AudioSystem};
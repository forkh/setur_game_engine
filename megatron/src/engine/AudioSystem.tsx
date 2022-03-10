import { ResourceManager } from './ResourceManager';
import { ReactNode } from 'react';

/**
 * Type of object
 */
type EventSounds = {
    [event: string]: number;
}

/**
 * AudioSystem class
 */
class AudioSystem {
    private static instance: AudioSystem;
    private static channels: HTMLAudioElement[];
    private static current_channel: number;
    private static events: EventSounds;

    /**
     * Constructor takes object with mapping of events and which track should be played.
     * @param events
     * @private
     */
    private constructor(events: EventSounds) {
        AudioSystem.channels = [];
        AudioSystem.events = {};

        //
        for (let eventsKey in events) {
            console.log("Added " + eventsKey + " to track " + events[eventsKey]);
            document.addEventListener(eventsKey, () => {
                this.playTrack(events[eventsKey]);
                console.log("A sound should have been played.");
            });
        }
    }

    /**
     * Add sound to channel
     * @param sound
     * @param channel
     */
    public static addTrack(sound: HTMLAudioElement, channel: number): void {
        AudioSystem.channels[channel] = sound;
    }

    /**
     * Play sound in channel
     * @param channel
     * @private
     */
    private playTrack(channel: number): void {
        AudioSystem.channels[channel].play();
        console.log("Playing something??");
    }

    /**
     * Initiates the singleton of AudioSystem
     * @param events
     */
    public static instantiateAudioSystem(events: EventSounds): void {
        if (!AudioSystem.instance) {
            AudioSystem.instance = new AudioSystem(events);
        }
    }

    public static play2() {
        AudioSystem.channels[0].play();
    }

    public static addSoundChannel(sound: HTMLAudioElement, channel: number): ReactNode {
        AudioSystem.channels[channel] = sound;

        const soundChannel: ReactNode = <audio id={String(channel)}>
            <source src={"AudioSystem.channels[channel].src"} type={"audio/wav"}/>
        </audio>;

        document.append('<source src={"AudioSystem.channels[channel].src"} type={"audio/wav"}/>');

        return soundChannel;
    }

    public static play(soundid: string): ReactNode {
        AudioSystem.channels[0] = ResourceManager.getAudio(soundid);

        return (
            <div id={"0"}>
                <button onClick={this.play2} >Play</button>
                <audio>
                    <source src={this.channels[0].src} type={"audio/wav"}></source>
                </audio>
            </div>
        );
    }
}

// Exports
export {AudioSystem};
export type {EventSounds};
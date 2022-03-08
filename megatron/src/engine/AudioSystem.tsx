import { ResourceManager } from './ResourceManager';
import { ReactNode } from 'react';

type EventSounds = {
    [event: string]: number;
}

const event = new Event('audio');
const cev = new CustomEvent('audio1', {
    bubbles: true,
    detail: { channel: "1" }
});

class AudioSystem {
    private static instance: AudioSystem;
    private static channels: HTMLAudioElement[];
    private static current_channel: number;
    private static events: EventSounds;

    private constructor(events: EventSounds) {
        AudioSystem.channels = [];
        AudioSystem.events = {};

        for (let eventsKey in events) {
            document.addEventListener(eventsKey+events[eventsKey], () => {
                this.playTrack(events[eventsKey]);
            });
        }

        if (events !== {}) {
            for (let eventsKey in events) {
                AudioSystem.events[eventsKey] = events[eventsKey];
            }
        }
    }

    public static addTrack(sound: HTMLAudioElement, channel: number): void {
        AudioSystem.channels[channel] = sound;
    }

    private playTrack(channel: number): void {
        AudioSystem.channels[channel].play();
        console.log("PLaying something??");
    }

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

export {AudioSystem};
export type {EventSounds};
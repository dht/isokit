import { Scene, Sprite, Vector3 } from '@babylonjs/core';
import { packs, logTime, logTimeEnd } from './isokit.globals';
import { vector3 } from './isokit.helpers';

let interval = 0,
    isLoopRunning: boolean = false;

export type ITalkInstruction = {
    time: number;
    mouthId: string;
};

export type ITalkInstructions = {
    characterId: string;
    instructions: ITalkInstruction[];
};

export const talk = () => {};

export const beat = () => {
    console.log('beat');
};

export const startLoop = () => {
    if (isLoopRunning) {
        return;
    }

    isLoopRunning = true;

    clearInterval(interval);
    interval = setInterval(() => {
        console.log('interval');
    }, 1000);
};

export const stopLoop = () => {
    isLoopRunning = false;
    clearInterval(interval);
};

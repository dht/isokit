import { Scene, Sprite, Vector3 } from '@babylonjs/core';
import { packs, logTime, logTimeEnd } from './isokit.globals';
import { vector3 } from './isokit.helpers';

export const initSprite = (sprite: IStudioSprite) => {
    const { identifier, packId, position, size, isOnGround, isHidden } = sprite;

    if (isHidden) {
        return;
    }

    const pack = packs[packId];

    if (!pack) {
        console.log(`packId ${packId} not found for sprite ${identifier}`);
        return;
    }

    try {
        const item = new Sprite(identifier, pack);

        const { width, height } = size;

        item.cellRef = identifier;
        item.width = width;
        item.height = height;

        item.position = vector3(position ?? [0, 0, 0]);

        if (isOnGround) {
            item.position.y = height / 2;
        }

        item.invertU = true;
    } catch (error) {
        console.error(error);
    }
};

export const initSprites = async (externals: IStudioSprites) => {
    logTime('initSprites');

    for (let sprite of Object.values(externals)) {
        const { identifier } = sprite;
        logTime(`initSprite ${identifier}`);
        await initSprite(sprite);
        logTimeEnd(`initSprite ${identifier}`);
    }

    logTimeEnd('initSprites');
};

export const moveSprite = (
    scene: Scene,
    spriteId: string,
    position: Vector3
) => {
    const sprite = scene.getMeshById(spriteId);

    if (sprite) {
        sprite.position = position;
    }
};

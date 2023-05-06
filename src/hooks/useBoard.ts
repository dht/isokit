import { useEffect, useState } from 'react';
import { invokeEvent } from 'shared-base';
import { startRender } from '../isokit';
import { loadBoard } from '../isokit.load.board';

export function useBoard(board: IBoardConfig) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        invokeEvent('load_babylonjs_scene', () => {
            loadBoard(board, () => {
                startRender();
                setIsReady(true);
            });
        });
    }, []);

    return isReady;
}

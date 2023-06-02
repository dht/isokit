import { useEffect, useState } from 'react';
import { invokeEvent } from 'shared-base';
import { startRender } from '../isokit';
import { initEffects } from '../isokit.effects';
import { scene } from '../isokit.globals';
import { loadBoard } from '../isokit.load.board';

export function useBoard(board: IBoardConfig, callback?: any) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    invokeEvent('load_babylonjs_scene', () => {
      loadBoard(board, () => {
        initEffects();

        startRender();
        setIsReady(true);

        if (callback) {
          callback(scene);
        }
      });
    });
  }, []);

  return isReady;
}

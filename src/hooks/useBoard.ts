import { useEffect, useState } from 'react';
import { invokeEvent } from 'shared-base';
import { startRender } from '../isokit';
import { initCenterBall, initEffects } from '../isokit.effects';
import { initGizmo } from '../isokit.gizmos';
import { scene } from '../isokit.globals';
import { loadBoard } from '../isokit.load.board';

export function useBoard(board: IBoardConfig, callback?: any) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    invokeEvent('load_babylonjs_scene', () => {
      loadBoard(board, () => {
        initEffects();
        initGizmo();
        initCenterBall();

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

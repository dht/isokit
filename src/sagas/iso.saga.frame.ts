import { call, cancel, delay, fork, select } from 'saga-ts';
import { scene } from '../isokit.globals';
import { pause } from './iso.saga.playback';
import { selectors } from '../store/selectors/iso.selectors.index';

let task: any;

export function* startFraming(currentTime: number) {
  yield delay(10);
  // scene.stopAllAnimations();

  // console.log('currentTime ->', currentTime);

  // yield call(pause);

  const items = yield* select(selectors.playback.$dotsForFrame, currentTime);
  // console.log('items ->', items);
}

export function* frameAll(currentTime: number) {
  if (task) {
    yield cancel(task);
  }

  task = yield* fork(startFraming, currentTime);
}

export function* clearPlayed() {}

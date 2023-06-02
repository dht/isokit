import { fork, put, select } from 'saga-ts';
import { scene } from '../isokit.globals';
import { animateItem, changeFlatPos, showMesh } from '../isokit.mesh';
import { actions } from '../store/iso.actions';
import { IDot, ISfxDot, IVisDot } from '../store/iso.types';
import { selectors } from '../store/selectors/iso.selectors.index';
import { log } from './helpers/log';
import { playSfx } from './utils/audio';

let played: any = {};
let playedViz: any = {};
let playedSfx: any = {};

export function* playback(action: any) {
  // log('playback', action);

  const { data } = action;
  const { currentTime } = data;

  if (currentTime === 0) {
    return;
  }

  // position/animation
  const dots = yield* select(selectors.base.$dots);

  const dotsFiltered = dots.filter((dot: any) => {
    const notPlayed = played[dot.id] !== true;
    const delta = currentTime * 1000 - dot.timestamp;
    return notPlayed && delta >= 0 && delta < 100 && !dot.skip;
  });

  for (let dot of dotsFiltered) {
    yield fork(playDot, dot);
  }

  // visibility
  const vizDots = yield* select(selectors.base.$visDots);

  const vizDotsFiltered = vizDots.filter((dot: any) => {
    const notPlayed = playedViz[dot.id] !== true;
    const delta = currentTime * 1000 - dot.timestamp;
    return notPlayed && delta >= 0 && delta < 100 && !dot.skip;
  });

  for (let dot of vizDotsFiltered) {
    yield fork(playVizDot, dot);
  }

  // sound effects
  const sfxDots = yield* select(selectors.base.$sfxDots);

  const sfxDotsFiltered = sfxDots.filter((dot: any) => {
    const notPlayed = playedSfx[dot.id] !== true;
    const delta = currentTime * 1000 - dot.timestamp;
    return notPlayed && delta >= 0 && delta < 100 && !dot.skip;
  });

  for (let dot of sfxDotsFiltered) {
    yield fork(playSfxDot, dot);
  }
}

export function* playDot(dot: IDot) {
  log('playDot', dot);

  const { itemId, params = {} } = dot;
  const { isAnimated } = params;

  const item = yield* select(selectors.singles.$item, itemId);

  if (!item) {
    return;
  }

  played[dot.id] = true;

  if (item.isCamera) {
    scene.activeCamera = scene.getCameraByName(itemId);
    yield put(
      actions.isoState.patch({
        cameraId: itemId,
        meshId: itemId,
      })
    );
  }

  changeFlatPos(itemId, params, item.isCamera);

  // static change
  if (!isAnimated) {
    return;
  }

  const nextDot = yield* select(selectors.base.$dotNext, dot.id);

  if (!nextDot) {
    console.log(`no next dot for ${dot.id}`);
    return;
  }

  // animation
  const delta = nextDot.timestamp - dot.timestamp;
  animateItem(delta, item.id, dot.params as any, nextDot.params as any, item.isCamera);
}

export function* playVizDot(dot: IVisDot) {
  const { itemId, show } = dot;
  showMesh(itemId, show);
}

export function* playSfxDot(dot: ISfxDot) {
  const { id, url, params } = dot;
  playSfx(id, url, params);
}

export function* clearPlayed() {
  log('clearPlayed');
  played = {};
  playedViz = {};
}

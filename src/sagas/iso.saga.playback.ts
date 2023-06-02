import { call, fork, put, select } from 'saga-ts';
import { scene } from '../isokit.globals';
import { animateItem, changeFlatPos } from '../isokit.mesh';
import { actions } from '../store/iso.actions';
import { IDot } from '../store/iso.types';
import { selectors } from '../store/selectors/iso.selectors.index';
import { l } from '../utils/logs';
import { bootstrap } from './iso.saga.bootstrap';
import { frameAll } from './iso.saga.frame';
import { playHudDot } from './iso.saga.hud';
import { playVisDot } from './iso.saga.meshes';
import { playSkyDot } from './iso.saga.sky';
import { playSfxDot } from './iso.saga.sound';
import { pauseWaveform, playWaveform } from './utils/audio';

export function* playback(action: any) {
  const { data } = action;
  const { currentTime } = data;

  if (currentTime === 0) {
    return;
  }

  // position/animation
  const dots = yield* select(selectors.playback.$dotsForPlayback, currentTime);

  //

  for (let dot of dots) {
    yield fork(playDot, dot);
  }

  // visibility
  const vizDots = yield* select(selectors.playback.$vizDotsForPlayback, currentTime);

  for (let dot of vizDots) {
    yield fork(playVisDot, dot);
  }

  // sound effects
  const sfxDots = yield* select(selectors.layers.$sfxDotsForPlayback, currentTime);

  for (let dot of sfxDots) {
    yield fork(playSfxDot, dot);
  }

  // hud
  const hudDots = yield* select(selectors.layers.$hudDotsForPlayback, currentTime);

  for (let dot of hudDots) {
    yield fork(playHudDot, dot);
  }

  // hud
  const skyDots = yield* select(selectors.layers.$skyDotsForPlayback, currentTime);

  for (let dot of skyDots) {
    yield fork(playSkyDot, dot);
  }
}

export function* playDot(dot: IDot) {
  const { itemId, params = {} } = dot;
  const { isAnimated } = params;

  const item = yield* select(selectors.singles.$item, itemId);

  if (!item) {
    return;
  }

  if (item.isCamera) {
    scene.activeCamera = scene.getCameraByName(itemId);
    yield put(
      actions.isoState.patch({
        cameraId: itemId,
      })
    );
  }

  changeFlatPos(itemId, params, item.isCamera);

  // static change
  if (!isAnimated) {
    return;
  }

  const nextDot = yield* select(selectors.playback.$dotNext, dot.id);

  if (!nextDot) {
    // console.log(`no next dot for ${dot.id}`);
    return;
  }

  // animation
  const delta = nextDot.timestamp - dot.timestamp;

  animateItem(delta, item.id, dot.params as any, nextDot.params as any, item.isCamera);
}

export function* onDataIsReady() {
  yield put(actions.isoState.patch({ isDataReady: true }));
  l({ message: 'data ready', verb: 'scene' });
  yield fork(checkIsReady);
}

export function* onSixtyIsReady() {
  yield put(actions.isoState.patch({ isSceneReady: true }));
  l({ message: 'scene ready', verb: 'scene' });
  yield fork(checkIsReady);
}

export function* checkIsReady() {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { isDataReady, isSceneReady } = isoState;

  if (!isDataReady || !isSceneReady) {
    return;
  }

  yield fork(bootstrap);
}

export function* playFrom(startAt?: number, options = {}) {
  playWaveform('music', startAt, options);
  playWaveform('voice', startAt, options);

  if (startAt !== undefined) {
    yield call(frameAll, startAt);
  }
}

export function* pause() {
  pauseWaveform('music');
  pauseWaveform('voice');
  scene.stopAllAnimations();
}

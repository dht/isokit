import { call, select, take, takeEvery } from 'saga-ts';
import { selectors } from '../store/selectors/iso.selectors.index';
import { syncDot } from './iso.saga.dots';
import { syncMesh } from './iso.saga.meshes';
import { log } from './helpers/log';
import { scene } from '../isokit.globals';
import { invokeEvent } from 'shared-base';
import { getFlatPos, toFlatPos } from './utils/vectors';
import { ArcRotateCamera } from '@babylonjs/core';
import { createIntervalChannel } from './channels/iso.channel.interval';
import { changeFlatPos } from '../isokit.mesh';

export function* syncParams(action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const playState = yield* select(selectors.raw.$rawPlayState);
  const { layerId, cameraId, meshId, paramsId, focusedShotId } = isoState;

  if (playState.playbackStatus === 'playing') {
    return;
  }

  if (paramsId !== 'setPiece') {
    return;
  }
}

export function* syncMesh(_action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { meshId } = isoState;
  const flatPos = getFlatPos(2);

  invokeEvent('iso/pos', flatPos);
  changeFlatPos(meshId, flatPos, false);
}

export function* syncCamera(_action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { cameraId } = isoState;
  const flatPos = getFlatPos(2);

  invokeEvent('iso/pos', flatPos);
  changeFlatPos(cameraId, flatPos, true);
}

export function* syncEverySecond() {
  yield take('BOARD_LOAD_DONE');
  const channel = createIntervalChannel(1000);
  yield takeEvery(channel, syncParams);
}

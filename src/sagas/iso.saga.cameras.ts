import { ArcRotateCamera } from '@babylonjs/core';
import { throttle } from 'lodash';
import { put, select, take } from 'saga-ts';
import { invokeEvent } from 'shared-base';
import { scene } from '../isokit.globals';
import { changeFlatPos, changePosition, changeRotation } from '../isokit.mesh';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { broadcastCamera } from './helpers/broadcast';
import { log } from './helpers/log';
import { predicateIsoState } from './helpers/predicates';
import { getFlatPos } from './utils/vectors';

export function* syncCamera(_action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { cameraId } = isoState;
  const flatPos = getFlatPos(2);
  invokeEvent('iso/pos', flatPos);
  changeFlatPos(cameraId, flatPos, true);
}

export function* controlCamera(action: any) {
  const { data } = action;
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { cameraId } = isoState;

  changePosition(cameraId, data, true);
  changeRotation(cameraId, data, true);
}

export function* onCameraChange(action: any) {
  const { cameraId } = action.payload;
  const camera = scene.getCameraByName(cameraId);

  if (!camera) {
    return;
  }

  let isArc = camera instanceof ArcRotateCamera;
  broadcastCamera(camera);
  yield put(actions.isoState.patch({ isArc }));
}

export function* listenToCamera() {
  yield take(predicateIsoState('isBoardReady', true));
  const callback = throttle(broadcastCamera, 100);
  scene.onAfterCameraRenderObservable.add(callback);
}

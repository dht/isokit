import { ArcRotateCamera, Camera, FreeCamera } from '@babylonjs/core';
import { takeEvery } from 'redux-saga/effects';
import { put, select, take } from 'saga-ts';
import { invokeEvent } from 'shared-base';
import { getCameraType } from '../isokit.cameras';
import { scene } from '../isokit.globals';
import { changeFlatPos, changePosition, changeRotation } from '../isokit.mesh';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { createSceneChannel } from './channels/iso.channel.scene';
import { predicateIsoState } from './helpers/predicates';
import { getFlatPos, toFlatPos } from './utils/vectors';

export function* controlCamera(action: any) {
  const { data } = action;
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { cameraId } = isoState;

  changePosition(cameraId, data, true);
  changeRotation(cameraId, data, true);
}

export function* nextCamera() {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { cameraId } = isoState;

  const nextCameraId = cameraId === 'arc' ? 'universal' : 'arc';

  yield put(actions.isoState.patch({ cameraId: nextCameraId }));
}

export function* broadcastCamera(activeCamera: Camera) {
  const cameraType = getCameraType(activeCamera);

  switch (cameraType) {
    case 'arc':
      const { target, radius, alpha, beta } = activeCamera as ArcRotateCamera;
      invokeEvent('camera/pos', toFlatPos({ position: target, radius, alpha, beta }, 2, { isArc: true })); // prettier-ignore
      break;
    case 'free':
      const { position, rotation } = activeCamera as FreeCamera;
      invokeEvent('camera/pos', toFlatPos({ position, rotation }, 2, { isArc: false })); // prettier-ignore
      break;
  }
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
  const channel = createSceneChannel(scene, 50);
  yield takeEvery(channel, broadcastCamera);
}

import { ArcRotateCamera, FreeCamera } from '@babylonjs/core';
import { put, select } from 'saga-ts';
import { invokeEvent } from 'shared-base';
import { scene } from '../isokit.globals';
import { changeFlatPos, changePosition, changeRotation } from '../isokit.mesh';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { getFlatPos, toFlatPos } from './utils/vectors';
import { log } from './helpers/log';

export function* syncCamera(_action: any) {
  log('synCamera');
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
  log('onCameraChange', action);
  const { cameraId } = action.payload;
  const camera = scene.getCameraByName(cameraId);

  if (!camera) {
    return;
  }

  let isArc = false;

  if (camera instanceof ArcRotateCamera) {
    const { target, radius, alpha, beta } = camera;
    isArc = true;

    invokeEvent(
      'iso/pos',
      toFlatPos(
        {
          position: target,
          radius,
          alpha,
          beta,
        },
        2
      )
    );
  }

  if (camera instanceof FreeCamera) {
    const { position, rotation } = camera;

    invokeEvent(
      'iso/pos',
      toFlatPos(
        {
          position,
          rotation,
        },
        2
      )
    );
  }

  yield put(actions.isoState.patch({ isArc }));
}

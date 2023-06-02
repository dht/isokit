import { call, select } from 'saga-ts';
import { selectors } from '../store/selectors/iso.selectors.index';
import { controlCamera } from './iso.saga.cameras';
import { controlDot } from './iso.saga.dots';
import { controlMesh } from './iso.saga.meshes';
import { log } from './helpers/log';

export function* controls(action: any) {
  log('controls', action);

  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { dotId, cameraId, meshId } = isoState;

  if (dotId) {
    yield call(controlDot, action);
    return;
  }

  if (cameraId) {
    yield call(controlCamera, action);
    return;
  }

  if (meshId) {
    yield call(controlMesh, action);
    return;
  }
}

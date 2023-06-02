import { call, select, takeEvery } from 'saga-ts';
import { selectors } from '../store/selectors/iso.selectors.index';
import { syncCamera } from './iso.saga.cameras';
import { syncDot } from './iso.saga.dots';
import { syncMesh } from './iso.saga.meshes';
import { log } from './helpers/log';

export function* syncParams(action: any) {
  log('syncParams', action);

  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { dotId, cameraId, meshId } = isoState;

  if (dotId) {
    yield call(syncDot, action);
    return;
  }

  if (cameraId) {
    yield call(syncCamera, action);
    return;
  }

  if (meshId) {
    yield call(syncMesh, action);
    return;
  }
}

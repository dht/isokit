import { call, put, select } from 'saga-ts';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { controlCamera } from './iso.saga.cameras';
import { controlDot } from './iso.saga.dots';
import { controlMesh } from './iso.saga.meshes';
import { invokeEvent } from 'shared-base';

export function* controls(action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { dotId, cameraId, meshId, layerId } = isoState;

  if (layerId === 'dots') {
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

  if (!dotId) {
    return;
  }

  switch (layerId) {
    case 'viz':
      yield put(actions.vizDots.patch(dotId, action.data));
      break;
    case 'sky':
      yield put(actions.skyDots.patch(dotId, action.data));
      break;
    case 'sfx':
      yield put(actions.sfxDots.patch(dotId, action.data));
      break;
    case 'vfx':
      yield put(actions.vfxDots.patch(dotId, action.data));
      break;
    case 'hud':
      yield put(actions.hudDots.patch(dotId, action.data));
      break;
  }
}

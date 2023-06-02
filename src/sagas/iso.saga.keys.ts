import { call, put, select } from 'saga-ts';
import { invokeEvent } from 'shared-base';
import { actions } from '../store/iso.actions';
import { WaveMode } from '../store/iso.types';
import { selectors } from '../store/selectors/iso.selectors.index';
import { nextCamera } from './iso.saga.cameras';
import { nextLayer, resetLayer } from './iso.saga.layers';
import { nextMesh } from './iso.saga.meshes';
import { l } from '../utils/logs';

const map: Record<WaveMode, WaveMode> = {
  [WaveMode.Faded]: WaveMode.Full,
  [WaveMode.Full]: WaveMode.None,
  [WaveMode.None]: WaveMode.Faded,
};

export function* toggleWaveform(_action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);

  const next = map[isoState.waveMode];

  yield put(actions.isoState.patch({ waveMode: next }));
}

export function* togglePerspective(action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  yield put(actions.isoState.patch({ isPerspectiveOn: !isoState.isPerspectiveOn }));
}

export function* onNumbers(action: any) {
  const items = yield* select(selectors.components.$meshesForSelector);
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { meshId } = isoState;
  let key = 'meshId';

  const number = parseInt(action.key, 10);

  const item = items[number - 1];

  if (!item) {
    return;
  }

  let value = item.id;

  if (meshId === item.id) {
    value = '';
  }

  yield put(
    actions.isoState.patch({
      [key]: value,
    })
  );
}

export function* onFunctionKeys(action: any) {
  const { key } = action;

  l({ message: `Function key "${key}" invoked`, verb: 'key', data: { action } });

  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { dotId, isGizmoOn, isSyncOn, isVolumeOn, isBezierOn } = isoState;

  switch (key) {
    case 'F1':
      yield put(actions.isoState.patch({ paramsId: 'dot' }));
      break;

    case 'F2':
      yield put(actions.isoState.patch({ paramsId: 'mesh' }));
      break;

    case 'F3':
      yield put(actions.isoState.patch({ paramsId: 'camera' }));
      break;

    case 'F4':
      yield put(actions.isoState.patch({ paramsId: 'setPiece' }));
      break;

    case 'F5':
      yield put(actions.isoState.patch({ isSyncOn: !isSyncOn }));
      break;

    case 'F9':
      yield put(actions.isoState.patch({ isVolumeOn: !isVolumeOn }));
      break;

    case 'F10':
      yield put(actions.isoState.patch({ isGizmoOn: !isGizmoOn }));
      break;

    case 'F11':
      yield put({ type: 'iso/logs' });
      break;

    case 'F12':
      yield put({ type: 'iso/restart' });
      break;
  }

  if (dotId) {
    switch (key) {
      case 'F5':
        yield put({ type: 'iso/easing', value: 'none' });
        break;

      case 'F6':
        yield put({ type: 'iso/easing', value: 'linear' });
        break;

      case 'F7':
        yield put({ type: 'iso/easing', value: 'easeInOut' });
        break;

      case 'F8':
        yield put(actions.isoState.patch({ isBezierOn: !isBezierOn }));
        break;
    }
  }
}

export function* onShortKeys(action: any) {
  const { key } = action;

  switch (key) {
    case 'c':
      yield* call(nextCamera);
      break;

    case 'l':
      yield* call(nextLayer);
      break;

    case 'd':
      yield* call(resetLayer);
      break;

    case 'm':
      yield* call(nextMesh);
      break;
  }
}

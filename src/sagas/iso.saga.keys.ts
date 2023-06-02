import { put, select } from 'saga-ts';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { WaveMode } from '../store/iso.types';
import { log } from './helpers/log';

const map: Record<WaveMode, WaveMode> = {
  [WaveMode.Faded]: WaveMode.Full,
  [WaveMode.Full]: WaveMode.None,
  [WaveMode.None]: WaveMode.Faded,
};

export function* toggleWaveform(_action: any) {
  log('toggleWaveform');

  const isoState = yield* select(selectors.raw.$rawIsoState);

  const next = map[isoState.waveMode];

  yield put(actions.isoState.patch({ waveMode: next }));
}

export function* togglePerspective(action: any) {
  log('togglePerspective');

  const isoState = yield* select(selectors.raw.$rawIsoState);
  yield put(actions.isoState.patch({ isPerspectiveOn: !isoState.isPerspectiveOn }));
}

export function* onNumbers(action: any) {
  log('onNumbers');

  const items = yield* select(selectors.base.$itemsForSelector);

  const number = parseInt(action.key, 10);

  const item = items[number - 1];

  if (!item) {
    return;
  }

  const { isCamera } = item;
  const key = isCamera ? 'cameraId' : 'meshId';

  yield put(
    actions.isoState.patch({
      cameraId: '',
      meshId: '',
      [key]: item.id,
    })
  );
}

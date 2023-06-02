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
  const isoState = yield* select(selectors.raw.$rawIsoState);

  const next = map[isoState.waveMode];

  yield put(actions.isoState.patch({ waveMode: next }));
}

export function* togglePerspective(action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  yield put(actions.isoState.patch({ isPerspectiveOn: !isoState.isPerspectiveOn }));
}

export function* toggleLog() {
  const isoState = yield* select(selectors.raw.$rawIsoState);

  yield put(
    actions.isoState.patch({
      showLog: !isoState.showLog,
    })
  );
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

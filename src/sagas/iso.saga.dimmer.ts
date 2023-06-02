import { put, select, takeEvery } from 'saga-ts';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { createIntervalChannel } from './channels/iso.channel.interval';
import { createMouseDownChannel } from './channels/iso.channel.mouse';

export function* checkMouseDown(action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const play = yield* select(selectors.raw.$rawPlayState);
  const { lastMoveTimestamp, isPerspectiveOn } = isoState;

  if (!isPerspectiveOn || play.playbackStatus !== 'playing') {
    return;
  }

  const delta = Date.now() - lastMoveTimestamp;

  if (delta > 8000) {
    yield put(actions.isoState.patch({ isDimmerOn: true }));
  }
}

export function* onMouseDown(action: any) {
  yield put(
    actions.isoState.patch({
      lastMoveTimestamp: Date.now(),
      isDimmerOn: false,
    })
  );
}

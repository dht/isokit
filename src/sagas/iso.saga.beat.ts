import { delay } from 'redux-saga/effects';
import { call, put, select } from 'saga-ts';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { pause, playFrom } from './iso.saga.playback';
import { l } from '../utils/logs';

export function* startBeat() {
  l({ message: 'startBeat', verb: 'playback' });
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { isVolumeOn, range, isRangeActive, totalDuration } = isoState;
  const volume = isVolumeOn ? 1 : 0;

  let startAt: number | undefined;

  if (isRangeActive) {
    startAt = range[0];
  }

  yield call(playFrom, startAt, { volume });
}

export function* playChange(action: any) {
  const { payload } = action;
  const { playbackStatus } = payload;

  switch (playbackStatus) {
    case 'playing':
      yield call(startBeat);
      break;
    case 'idle':
      yield call(pause);
    default:
      break;
  }
}

export function* startOver(_action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { range, isRangeActive, totalDuration } = isoState;
  const [start, _end] = range;

  let startAt = 0;

  if (isRangeActive) {
    startAt = start;
  }

  yield call(playFrom, startAt);
}

export function* checkIfReady(_action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const play = yield* select(selectors.raw.$rawPlayState);

  const { isAudioReady, isBoardReady, isDataReady } = isoState;

  if (play.playbackStatus === 'playing') {
    return;
  }

  if (!isAudioReady || !isBoardReady || !isDataReady) {
    return;
  }

  yield delay(10);

  // autoplay, won't work for sound permissions on Chrome
  // yield put(actions.playState.patch({ playbackStatus: 'playing' }));
}

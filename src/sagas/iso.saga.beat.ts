import { call, put, select } from 'saga-ts';
import { scene } from '../isokit.globals';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { log } from './helpers/log';
import { pauseWaveform, playWaveform, seekWaveform } from './utils/audio';

export function* startBeat() {
  log('startBeat');
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { isVolumeOn, range, isRangeActive, totalDuration } = isoState;
  const volume = isVolumeOn ? 1 : 0;

  let startAt: number | undefined;

  if (isRangeActive) {
    startAt = range[0];
  }

  playWaveform('music', volume, startAt);
  playWaveform('voice', volume, startAt);
}

export function* pauseBeat() {
  log('pauseBeat');
  pauseWaveform('music');
  pauseWaveform('voice');
  scene.stopAllAnimations();
}

export function* playChange(action: any) {
  log('playChange', action);
  const { payload } = action;
  const { playbackStatus } = payload;

  switch (playbackStatus) {
    case 'playing':
      yield call(startBeat);
      break;
    case 'idle':
      yield call(pauseBeat);
    default:
      break;
  }
}

export function* startOver(_action: any) {
  log('startOver');
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { range, isRangeActive, totalDuration } = isoState;
  const [start, _end] = range;

  let startAt = 0;

  if (isRangeActive) {
    startAt = start;
  }

  seekWaveform('music', startAt);
  seekWaveform('voice', startAt);
}

export function* checkIfReady(_action: any) {
  log('checkIfReady');
  const isoState = yield* select(selectors.raw.$rawIsoState);

  const { isAudioReady, isBoardReady } = isoState;

  if (!isAudioReady || !isBoardReady) {
    return;
  }

  yield put(actions.play.patch({ playbackStatus: 'playing' }));
}

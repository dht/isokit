import { select } from 'saga-ts';
import { selectors } from '../store/selectors/iso.selectors.index';
import { seekWaveform } from './utils/audio';
import { log } from './helpers/log';

export function* regions(action: any) {
  // log('regions', action);

  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { data } = action;
  const { currentTime } = data;

  const { range, isRangeActive, totalDuration } = isoState;

  if (!isRangeActive) {
    return;
  }

  const percent = currentTime / totalDuration;

  // console.log('percent ->', percent);

  const [start, end] = range;
  // console.log('end ->', end);

  if (percent < end) {
    return;
  }

  seekWaveform('music', start);
  seekWaveform('voice', start);
}

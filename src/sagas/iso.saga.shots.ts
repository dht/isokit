import { call, delay, put, select } from 'saga-ts';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { setZoom } from './utils/audio';

let task: any;

type Action = {
  type: 'ISOSTATE_PATCH';
  payload: {
    shotId?: string;
    focusedShotId?: string;
  };
};

export function* onShotChange(action: Action) {
  const { payload } = action;
  const { shotId, focusedShotId } = payload;
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const shot = yield* select(selectors.singles.$shot, shotId);

  const { totalDuration } = isoState;

  if (!shot) {
    return;
  }

  yield delay(10);

  const { timestamp, duration } = shot;

  const newRange = [
    timestamp / totalDuration / 1000,
    (timestamp + duration) / totalDuration / 1000,
  ];

  yield put(
    actions.isoState.patch({
      range: newRange,
    })
  );
}

export function* focusWaveForm(focusedShotId?: string) {
  if (!focusedShotId) {
    return;
  }

  const isoState = yield* select(selectors.raw.$rawIsoState);
  const shot = yield* select(selectors.singles.$shot, focusedShotId);

  const { totalDuration, timelineWidth } = isoState;

  if (!shot) {
    return;
  }

  const { duration } = shot;

  const percent = duration / totalDuration / 1000;

  const pixelForSecondTotal = timelineWidth / totalDuration;
  const pixelForSecond = pixelForSecondTotal / percent;

  setZoom('music', pixelForSecond);
  setZoom('voice', pixelForSecond);
}

export function* onShotDrillDown(action: Action) {
  yield delay(10);
  const { payload } = action;
  const { focusedShotId } = payload;
  yield call(focusWaveForm, focusedShotId);
}

export function* onShotDrillDownClear(action: Action) {
  yield delay(10);
  // console.log('action ->', action);
}

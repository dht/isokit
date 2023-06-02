import { put, select } from 'saga-ts';
import { getJson, setJson } from 'shared-base';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { log } from './helpers/log';

export function* saveIsoState(_action: any) {
  log('saveIsoState');

  const isoState = yield* select(selectors.raw.$rawIsoState);
  setJson('ISO_STATE', isoState);
}

export function* loadIsoState() {
  log('loadIsoState');

  const isoState = getJson('ISO_STATE');

  if (!isoState) {
    return;
  }

  yield put(
    actions.isoState.setAll({
      ...isoState,
      isAudioReady: false,
      isBoardReady: false,
      isVoiceReady: false,
      isMusicReady: false,
    } as any)
  );
}

export function* saveDots(_action: any) {
  log('saveDots');

  const dots = yield* select(selectors.raw.$rawDots);
  setJson('ISO_DOTS', dots);
}

export function* loadDots() {
  log('loadDots');
  const dots = getJson('ISO_DOTS');

  if (!dots) {
    return;
  }

  yield put(
    actions.dots.setAll({
      ...dots,
    } as any)
  );
}

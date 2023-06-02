import { delay, put, select } from 'saga-ts';
import { getJson, setJson } from 'shared-base';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { log } from './helpers/log';

const persistenceMode: string = 'api'; //'localstorage';

export function* saveIsoState(_action: any) {
  yield delay(10);

  const isoState = yield* select(selectors.raw.$rawIsoState);
  setJson('ISO_STATE', isoState);
}

export function* loadIsoState() {
  const isoState = getJson('ISO_STATE');

  if (!isoState) {
    return;
  }

  yield put(
    actions.isoState.setAll({
      ...isoState,
      isAudioReady: false,
      isVoiceReady: false,
      isMusicReady: false,
      isBoardReady: false,
      isDataReady: false,
      isSceneReady: false,
      layerId: 'dots',
      meshId: '',
      cameraId: '',
      dotId: '',
    } as any)
  );
}

export function* saveDots(_action: any) {
  const dots = yield* select(selectors.raw.$rawDots);

  switch (persistenceMode) {
    case 'localstorage':
      setJson('ISO_DOTS', dots);
      break;
    case 'api':
      break;
  }
}

export function* loadDots() {
  if (persistenceMode !== 'localstorage') {
    return;
  }

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

import { put, select } from 'saga-ts';
import { actions } from '../store/iso.actions';
import { ISceneItem } from '../store/iso.types';
import { log } from './helpers/log';
import { selectors } from '../store/selectors/iso.selectors.index';

export function* selectItem(action: any) {
  const item = action.item as ISceneItem;
  let { id, itemType } = item;

  const isoState = yield* select(selectors.raw.$rawIsoState);

  let key = '',
    value = id;

  switch (itemType) {
    case 'camera':
      key = 'cameraId';
      break;
    case 'mesh':
      key = 'meshId';
      break;
    case 'layer':
      key = 'layerId';
      break;
  }

  // unselect
  if (itemType === 'mesh' && isoState.meshId === id) {
    value = '';
  }

  yield put(
    actions.isoState.patch({
      [key]: value,
    })
  );
}

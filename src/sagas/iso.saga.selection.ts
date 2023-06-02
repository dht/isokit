import { put } from 'saga-ts';
import { actions } from '../store/iso.actions';
import { IItem } from '../store/iso.types';
import { log } from './helpers/log';

export function* selectItem(action: any) {
  log('selectItem', action);

  const item = action.item as IItem;

  let key = '';

  switch (item.itemType) {
    case 'camera':
      key = 'cameraId';
      break;
    case 'mesh':
      key = 'meshId';
      break;
  }

  yield put(
    actions.isoState.patch({
      cameraId: '',
      meshId: '',
      [key]: item.id,
    })
  );
}

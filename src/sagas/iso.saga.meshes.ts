import { select } from 'saga-ts';
import { invokeEvent } from 'shared-base';
import { scene } from '../isokit.globals';
import { changeFlatPos, changePosition, changeRotation, showMesh } from '../isokit.mesh';
import { IDot } from '../store/iso.types';
import { selectors } from '../store/selectors/iso.selectors.index';
import { getFlatPos, toFlatPos } from './utils/vectors';

export function* syncMesh(_action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { meshId } = isoState;
  const flatPos = getFlatPos(2);
  invokeEvent('iso/pos', flatPos);
  changeFlatPos(meshId, flatPos, false);
}

export function* controlMesh(action: any) {
  const { data } = action;
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { meshId } = isoState;

  changePosition(meshId, data);
  changeRotation(meshId, data);
}

export function* onMeshChange(action: any) {
  const { meshId } = action.payload;
  const mesh = scene.getMeshByName(meshId);

  if (!mesh) {
    return;
  }

  const { position, rotation } = mesh;

  invokeEvent(
    'iso/pos',
    toFlatPos(
      {
        position,
        rotation,
      },
      2
    )
  );
}

export function* playVisDot(dot: IDot) {
  const { itemId, params = {} } = dot;

  const { show } = params;

  if (typeof show === 'undefined') {
    return;
  }

  showMesh(itemId, show);
}

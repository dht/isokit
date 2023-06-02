import { select } from 'saga-ts';
import { invokeEvent } from 'shared-base';
import { scene } from '../isokit.globals';
import { changeFlatPos, changePosition, changeRotation } from '../isokit.mesh';
import { selectors } from '../store/selectors/iso.selectors.index';
import { getFlatPos, toFlatPos } from './utils/vectors';
import { log } from './helpers/log';

export function* syncMesh(_action: any) {
  log('syncMesh');

  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { meshId } = isoState;
  const flatPos = getFlatPos(2);
  invokeEvent('iso/pos', flatPos);
  changeFlatPos(meshId, flatPos, false);
}

export function* controlMesh(action: any) {
  log('controlMesh', action);

  const { data } = action;
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { meshId } = isoState;

  changePosition(meshId, data);
  changeRotation(meshId, data);
}

export function* onMeshChange(action: any) {
  log('onMeshChange', action);

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

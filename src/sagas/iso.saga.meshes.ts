import { put, select } from 'saga-ts';
import { invokeEvent } from 'shared-base';
import { scene } from '../isokit.globals';
import { changeFlatPos, changePosition, changeRotation, showMesh } from '../isokit.mesh';
import { IDot } from '../store/iso.types';
import { selectors } from '../store/selectors/iso.selectors.index';
import { getFlatPos, toFlatPos } from './utils/vectors';
import { actions } from '../store/iso.actions';

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

  const { position, rotation, scaling } = mesh;

  invokeEvent(
    'iso/pos',
    toFlatPos(
      {
        position,
        rotation,
        scaling,
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

export function* nextMesh() {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const { meshId } = isoState;

  const meshes = yield* select(selectors.components.$meshesForSelector);
  const meshIndex = meshes.findIndex((mesh) => mesh.id === meshId);
  let nextMesh = meshes[meshIndex + 1];

  if (!nextMesh) {
    nextMesh = meshes[0];
  }

  if (!nextMesh) {
    return;
  }

  yield put(actions.isoState.patch({ meshId: nextMesh.id }));
}

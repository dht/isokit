import { AbstractMesh, Vector3 } from '@babylonjs/core';
import { select } from 'saga-ts';
import { scene } from '../isokit.globals';
import { selectors } from '../store/selectors/iso.selectors.index';

let position: Vector3, rotation: Vector3, mesh: AbstractMesh | null;

export function* onPadStart(action: any) {
  const { data } = action;

  const isoState = yield* select(selectors.raw.$rawIsoState);

  const { meshId } = isoState;

  mesh = scene.getMeshByName(meshId);

  if (!mesh) {
    return;
  }

  position = mesh.position.clone();
  rotation = mesh.rotation.clone();
}

export function* onPadMove(action: any) {
  const { data } = action;

  if (!mesh) {
    return;
  }

  let { dx, dy, withCtrl, withAlt, withShift } = data;

  const { rotation } = mesh;

  dx = dx * 0.2;
  dy = dy * 0.2;

  if (withShift) {
    mesh.rotation.y = rotation.y + dx;
    return;
  }

  if (withCtrl) {
    mesh.position.y = rotation.y + dy;
    return;
  }

  // move forward according to rotation
  mesh.position.x = position.x + dy;

  // move to sides according to rotation
  mesh.position.z = position.z + dx;

  // move up according to rotation
}

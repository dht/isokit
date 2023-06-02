import { call, fork, put, select } from 'saga-ts';
import { scene } from '../isokit.globals';
import { animateItem, changeFlatPos } from '../isokit.mesh';
import { actions } from '../store/iso.actions';
import { IDot } from '../store/iso.types';
import { selectors } from '../store/selectors/iso.selectors.index';
import { log } from './helpers/log';
import { frameAll } from './iso.saga.frame';
import { playVisDot } from './iso.saga.meshes';
import { playSfxDot } from './iso.saga.sound';
import { pauseWaveform, playWaveform } from './utils/audio';
import { bootstrap } from './iso.saga.bootstrap';
import { AbstractMesh, Mesh, Vector3 } from '@babylonjs/core';

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

  const { dx, dy, isRotation } = data;

  if (isRotation) {
    mesh.rotation.y = rotation.y + dx * 0.2;
    mesh.position.y = position.y - dy * 0.1;
  } else {
    mesh.position.x = position.x + dx * 0.2;
    mesh.position.z = position.z + dy * 0.2;
  }
}

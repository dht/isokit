import { Vector3 } from '@babylonjs/core';
import { scene } from '../isokit.globals';
import { changeSkyBox } from '../isokit.skybox';
import { IDot } from '../store/iso.types';

export function* playSkyDot(dot: IDot) {
  const { params } = dot;

  const { url } = params ?? {};

  const camera = scene.getCameraByName('universal');

  if (!camera) {
    return;
  }

  scene.activeCamera = camera;

  camera.position = new Vector3(0, 0, 0);

  const mesh = scene.getMeshByName('skyPlane');

  if (!mesh) {
    return;
  }

  mesh.isVisible = true;

  changeSkyBox(url);
}

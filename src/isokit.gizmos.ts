import { GizmoManager, PositionGizmo, RotationGizmo, UtilityLayerRenderer } from '@babylonjs/core';
import { gizmo, scene, setGizmo } from './isokit.globals';
import { select } from 'saga-ts';
import { selectors } from './store/selectors/iso.selectors.index';

export const initGizmo = () => {
  var utilLayer = new UtilityLayerRenderer(scene);

  var gizmoManager = new GizmoManager(scene);
  gizmoManager.usePointerToAttachGizmos = false;
  gizmoManager.positionGizmoEnabled = true;
  gizmoManager.rotationGizmoEnabled = false;
  gizmoManager.scaleGizmoEnabled = false;

  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'g':
        gizmoManager.positionGizmoEnabled = true;
        gizmoManager.rotationGizmoEnabled = false;
        gizmoManager.scaleGizmoEnabled = false;
        break;
      case 'r':
        gizmoManager.rotationGizmoEnabled = true;
        gizmoManager.positionGizmoEnabled = false;
        gizmoManager.scaleGizmoEnabled = false;
        break;
      case 's':
        gizmoManager.scaleGizmoEnabled = true;
        gizmoManager.positionGizmoEnabled = false;
        gizmoManager.rotationGizmoEnabled = false;
        break;
    }
  });

  setGizmo(gizmoManager);
};

export const attachGizmo = (meshId: string) => {
  const mesh = scene.getMeshByName(meshId);

  if (!mesh) {
    return;
  }

  gizmo.attachToMesh(mesh);
};

export const hideGizmo = () => {
  gizmo.attachToMesh(null);
};

export function* toggleGizmo(action: any) {
  const { payload } = action;
  const { isGizmoOn } = payload;

  if (!isGizmoOn) {
    hideGizmo();
    return;
  }

  const { meshId } = yield* select(selectors.raw.$rawIsoState);
  attachGizmo(meshId);
}

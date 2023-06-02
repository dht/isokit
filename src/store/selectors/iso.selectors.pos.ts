import { createSelector } from 'reselect';
import { scene } from '../../isokit.globals';
import { cameraFlatPos, meshFlatPos } from '../../sagas/utils/vectors';
import { AllPos, IPosFlat } from '../iso.types';
import * as raw from './iso.selectors.raw';

export const $setPieceDot = createSelector(raw.$rawIsoState, raw.$rawDots, (isoState, dots) => {
  const { meshId, cameraId, focusedShotId } = isoState;

  let relevantDots = Object.values(dots).filter((dot) => dot.isSetPiece);

  if (focusedShotId) {
    relevantDots = relevantDots.filter((dot) => dot.shotId === focusedShotId);
  }

  if (meshId) {
    relevantDots = relevantDots.filter((dot) => dot.itemId === meshId);
  } else {
    relevantDots = relevantDots.filter((dot) => dot.itemId === cameraId);
  }

  return relevantDots[0];
});

export const $allPos = createSelector(
  [raw.$rawIsoState, raw.$rawSceneItems, (_state, v) => v],
  (isoState, items, v: any) => {
    const { meshId, cameraId } = isoState;

    const activeCamera = scene.activeCamera;

    const output: AllPos = {
      cameraActive: cameraFlatPos(activeCamera!),
      cameraSelected: cameraFlatPos(cameraId),
      meshSelected: meshFlatPos(meshId),
      meshes: {},
    } as AllPos;

    Object.values(items)
      .filter((item) => !item.groupId)
      .forEach((item) => {
        const { id, itemType } = item;
        const flatPos = itemType === 'mesh' ? meshFlatPos(id) : cameraFlatPos(id);
        output.meshes[id] = flatPos as IPosFlat;
      });

    return output;
  }
);

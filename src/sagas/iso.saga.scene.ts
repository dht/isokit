import { clone, differenceWith } from 'lodash';
import { select } from 'saga-ts';
import { invokeEvent } from 'shared-base';
import { selectors } from '../store/selectors/iso.selectors.index';
import { isEqual } from './utils/vectors';

let previousAllPos: any = {};

export function* onRender(action: any) {
  const isoState = yield* select(selectors.raw.$rawIsoState);
  const allPos = yield* select(selectors.pos.$allPos, {});

  const didCameraMove = !isEqual(previousAllPos.cameraSelected, allPos.cameraSelected);
  const didMeshMove = !isEqual(previousAllPos.meshSelected, allPos.meshSelected);

  const { meshId, cameraId } = isoState;

  if (meshId && didMeshMove) {
    invokeEvent('iso/pos/mesh', allPos.meshSelected);
  }

  if (cameraId && didCameraMove) {
    invokeEvent('iso/pos/camera', allPos.cameraSelected);
  }

  previousAllPos = clone(allPos);
}

import { ArcRotateCamera, Camera, FreeCamera } from '@babylonjs/core';
import { invokeEvent } from 'shared-base';
import { toFlatPos } from '../utils/vectors';

export const broadcastCamera = (camera: Camera) => {
  const cameraType = getCameraType(camera);

  switch (cameraType) {
    case 'arc':
      const { target, radius, alpha, beta } = camera as ArcRotateCamera;
      invokeEvent('camera/pos', toFlatPos({ position: target, radius, alpha, beta }, 2, { isArc: true })); // prettier-ignore
      break;
    case 'free':
      const { position, rotation } = camera as FreeCamera;
      invokeEvent('camera/pos', toFlatPos({ position, rotation }, 2, { isArc: false })); // prettier-ignore
      break;
  }
};

export const getCameraType = (camera?: Camera) => {
  if (camera instanceof ArcRotateCamera) {
    return 'arc';
  } else if (camera instanceof FreeCamera) {
    return 'free';
  }

  return 'unknown';
};

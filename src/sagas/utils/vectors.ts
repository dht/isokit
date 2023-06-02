import { ArcRotateCamera, FreeCamera, Vector3 } from '@babylonjs/core';
import { scene } from '../../isokit.globals';
import { Arc, IPosFlat, Vector } from '../../store/iso.types';

export const toVector = (vector: Vector3): Vector => {
  return {
    x: vector.x,
    y: vector.y,
    z: vector.z,
  };
};

export const fromVector = (vector: Vector): Vector3 => {
  return new Vector3(vector.x, vector.y, vector.z);
};

export const extractArc = (camera: ArcRotateCamera): Arc => {
  return {
    alpha: camera.alpha,
    beta: camera.beta,
    radius: camera.radius,
  };
};

export const applyArc = (camera: ArcRotateCamera, arc: Arc) => {
  camera.alpha = arc.alpha;
  camera.beta = arc.beta;
  camera.radius = arc.radius;
};

type AllPos = {
  position: Vector3;
  rotation: Vector3;
  radius: number;
  alpha: number;
  beta: number;
};

export const toFlatPos = (
  all: Partial<AllPos>,
  maxDigits: number = 2,
  extra: Json = {}
): IPosFlat => {
  const output: IPosFlat = {
    x: 0,
    y: 0,
    z: 0,
    rx: 0,
    ry: 0,
    rz: 0,
    alpha: 0,
    beta: 0,
    radius: 0,
  };

  const { position, rotation, radius, alpha, beta } = all;

  if (position) {
    output.x = position.x;
    output.y = position.y;
    output.z = position.z;
  }

  if (rotation) {
    output.rx = radiansToDegrees(rotation.x);
    output.ry = radiansToDegrees(rotation.y);
    output.rz = radiansToDegrees(rotation.z);
  }

  if ('radius' in all) {
    output.radius = radius;
  }

  if ('alpha' in all) {
    output.alpha = radiansToDegrees(alpha);
  }

  if ('beta' in all) {
    output.beta = radiansToDegrees(beta);
  }

  for (let key in output) {
    if (key in output) {
      (output as any)[key] = parseMaxDigits((output as any)[key], maxDigits);
    }
  }

  return { ...output, ...extra };
};

export const parseMaxDigits = (value: number, maxDigits: number = 2) => {
  const factor = Math.pow(10, maxDigits);
  return Math.round(value * factor) / factor;
};

export const radiansToDegrees = (radians?: number) => {
  if (radians === undefined) {
    return undefined;
  }

  return radians * (180 / Math.PI);
};

export function getFlatPos(maxDigits: number = 2) {
  const activeCamera = scene.activeCamera;

  if (!activeCamera) {
    return undefined;
  }

  const position = activeCamera.position;

  if (activeCamera instanceof ArcRotateCamera) {
    const target = activeCamera.target;
    const arc = extractArc(activeCamera);
    return toFlatPos({ position: target, ...arc }, maxDigits);
  }

  if (activeCamera instanceof FreeCamera) {
    return toFlatPos({ position, rotation: activeCamera.rotation }, maxDigits);
  }

  return toFlatPos({ position }, maxDigits);
}

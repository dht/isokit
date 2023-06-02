import { ArcRotateCamera, Camera, FreeCamera, Vector3 } from '@babylonjs/core';
import { scene } from '../../isokit.globals';
import { Arc, IDeepPos, IPosFlat, Vector } from '../../store/iso.types';

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

export const toFlatPos = (
  all: Partial<IDeepPos>,
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
    sx: 0,
    sy: 0,
    sz: 0,
    alpha: 0,
    beta: 0,
    radius: 0,
  };

  const { position, rotation, scaling, radius, alpha, beta } = all;

  if (position) {
    output.x = position.x;
    output.y = position.y;
    output.z = position.z;
  }

  if (scaling) {
    output.sx = scaling.x;
    output.sy = scaling.y;
    output.sz = scaling.z;
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
  if (!scene.activeCamera) {
    return;
  }

  return cameraFlatPos(scene.activeCamera, maxDigits);
}

export function meshFlatPos(meshId: string, maxDigits: number = 2) {
  const mesh = scene.getMeshById(meshId);

  if (!mesh) {
    return undefined;
  }

  return toFlatPos(
    {
      position: mesh.position,
      rotation: mesh.rotation,
      scaling: mesh.scaling,
    },
    maxDigits
  );
}

export function cameraFlatPos(cameraId: string | Camera, maxDigits: number = 2) {
  const camera = cameraId instanceof Camera ? cameraId : scene.getCameraById(cameraId);

  if (!camera) {
    return undefined;
  }

  if (camera instanceof ArcRotateCamera) {
    return toFlatPos(
      {
        alpha: camera.alpha,
        beta: camera.beta,
        radius: camera.radius,
        position: camera.target,
      },
      maxDigits
    );
  }

  if (camera instanceof FreeCamera) {
    return toFlatPos(
      {
        position: camera.position,
        rotation: camera.rotation,
      },
      maxDigits
    );
  }

  return toFlatPos(
    {
      position: camera.position,
    },
    maxDigits
  );
}

export const isEqual = (pos1: IPosFlat = {}, pos2: IPosFlat = {}) => {
  const keys = [
    'x',
    'y',
    'z',
    'rx',
    'ry',
    'rz',
    'sx',
    'sy',
    'sz',
    'alpha',
    'beta',
    'radius',
    'b1',
    'b2',
    'b3',
    'b4',
    'l',
    'v',
    'isAnimated',
    'replace',
  ];

  for (let key of keys) {
    if (pos1[key] && pos1[key] !== pos2[key]) {
      return false;
    }
  }

  return true;
};

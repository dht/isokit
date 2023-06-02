import {
  ArcRotateCamera,
  Camera,
  CubicEase,
  EasingFunction,
  FreeCamera,
  Tools,
} from '@babylonjs/core';
import { delay, getJson, setJson, ts } from 'shared-base';
import { logTime, logTimeEnd, scene } from './isokit.globals';
import { vector3, createAnimation, simplifyRadians, vectorRadians } from './isokit.helpers';
import { IArc } from './types';

type InitMethod = (camera: IStudioCamera) => void;

export const initCameraArc = (camera: IStudioCamera) => {
  const { identifier, values } = camera;
  const {
    alpha,
    beta,
    radius,
    target,
    lowerRadiusLimit,
    upperRadiusLimit,
    lowerBetaLimit,
    upperBetaLimit,
  } = values ?? {};

  const item = new ArcRotateCamera(identifier, alpha, beta, radius, vector3(target), scene);

  item.attachControl(true);
  item.lowerRadiusLimit = lowerRadiusLimit;
  item.upperRadiusLimit = upperRadiusLimit;
  item.lowerBetaLimit = Tools.ToRadians(lowerBetaLimit);
  item.upperBetaLimit = Tools.ToRadians(upperBetaLimit);
};

export const initCameraUniversal = (camera: IStudioCamera) => {
  const { identifier, position, rotation } = camera;

  const item = new FreeCamera(identifier, vector3(position ?? [0, 0, 0]), scene);

  item.rotation = vectorRadians(rotation ?? [0, 0, 0]);

  item.attachControl(true);
};

const map: Record<string, InitMethod> = {
  universal: initCameraUniversal,
  arc: initCameraArc,
};

export const initCamera = (camera: IStudioCamera) => {
  const method = map[camera.type];

  if (method) {
    return method(camera);
  }
};

export const initCameras = async (cameras: IStudioCameras) => {
  logTime('initCameras');

  for (let camera of Object.values(cameras)) {
    const { identifier } = camera;

    logTime(`initCamera ${identifier}`);
    await initCamera(camera);
    logTimeEnd(`initCamera ${identifier}`);
  }

  logTimeEnd('initCameras');
};

export const cameraFlyIn = async (values: Json) => {
  const { radius, alpha, beta, target } = values;

  await delay(0);

  const camera = scene.activeCamera as ArcRotateCamera;

  const toRadius = camera.radius;
  const toAlpha = camera.alpha;
  const toBeta = camera.beta;
  const toTarget = camera.target;

  camera.radius = radius;
  camera.alpha = alpha;
  camera.beta = beta;
  camera.target = vector3(target);

  if (!camera) {
    return;
  }

  moveCameraArc(camera, {
    radius: toRadius,
    alpha: toAlpha,
    beta: toBeta,
    target: toTarget,
  });
};

export function animateCamera(params: Json) {
  const camera = scene.activeCamera as ArcRotateCamera;

  if (camera instanceof FreeCamera) {
    const { position, rotation } = camera;

    moveCameraFree(camera, {
      position,
      rotation,
      ...params,
    });
  } else if (camera instanceof ArcRotateCamera) {
    const { radius, alpha, beta, target } = camera;

    moveCameraArc(camera, {
      radius,
      alpha,
      beta,
      target,
      ...params,
    });
  }
}

export const switchCamera = (cameraId: string) => {
  const camera = scene.getCameraByName(cameraId);

  if (!camera) {
    return;
  }

  scene.setActiveCameraById(cameraId);
  camera.attachControl(true);
};

export const positionCamera = (position: IPosition, rotation?: IPosition) => {
  const camera = scene.activeCamera;

  if (!camera || !(camera instanceof FreeCamera)) {
    return;
  }

  camera.position = vector3(position);

  if (rotation) {
    camera.rotation = vectorRadians(rotation);
  }

  camera.attachControl(true);
};

export const arcCamera = (values: Partial<IArc>) => {
  const camera = scene.activeCamera;

  if (!camera || !(camera instanceof ArcRotateCamera)) {
    return;
  }

  const { alpha, beta, radius, target } = values;

  if (alpha) {
    camera.alpha = alpha;
  }

  if (beta) {
    camera.beta = beta;
  }

  if (radius) {
    camera.radius = radius;
  }

  if (target) {
    camera.setTarget(vector3(target));
  }

  camera.attachControl(true);
};

export function moveCameraArc(camera: ArcRotateCamera, params: Json) {
  const { radius, alpha, beta, target, speed = 4 } = params;

  const ease = new CubicEase();
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

  camera.animations = [
    createAnimation({
      property: 'radius',
      from: camera.radius,
      to: radius,
    }),
    createAnimation({
      property: 'beta',
      from: simplifyRadians(camera.beta),
      to: beta,
    }),
    createAnimation({
      property: 'alpha',
      from: simplifyRadians(camera.alpha),
      to: alpha,
    }),
    createAnimation({
      property: 'target.x',
      from: camera.target.x ?? 0,
      to: target.x,
    }),
    createAnimation({
      property: 'target.y',
      from: camera.target.y ?? 0,
      to: target.y,
    }),
    createAnimation({
      property: 'target.z',
      from: camera.target.z ?? 0,
      to: target.z,
    }),
  ];

  scene.beginAnimation(camera, 0, 100, false, speed);
}

export function moveCameraFree(camera: FreeCamera, params: Json) {
  const { position, rotation, speed = 4, isLinear } = params;

  const ease = new CubicEase();
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

  camera.animations = [
    createAnimation({
      property: 'rotation.x',
      from: camera.rotation.x,
      to: rotation.x,
      isLinear,
    }),
    createAnimation({
      property: 'rotation.y',
      from: camera.rotation.y,
      to: rotation.y,
      isLinear,
    }),
    createAnimation({
      property: 'rotation.z',
      from: camera.rotation.z,
      to: rotation.z,
      isLinear,
    }),
    createAnimation({
      property: 'position.x',
      from: camera.position.x,
      to: position.x,
      isLinear,
    }),
    createAnimation({
      property: 'position.y',
      from: camera.position.y,
      to: position.y,
      isLinear,
    }),
    createAnimation({
      property: 'position.z',
      from: camera.position.z,
      to: position.z,
      isLinear,
    }),
  ];

  scene.beginAnimation(camera, 0, 100, false, speed);
}

type SnoozeParams = {
  minutes: number;
};

export const snoozeFlyIn = (params: SnoozeParams) => {
  const { minutes } = params;

  setJson('FLIGHT_IN_SNOOZE', {
    snoozeUntil: ts() + minutes * 60 * 1000,
  });
};

export const snoozeFlyInCheck = () => {
  const snooze = getJson('FLIGHT_IN_SNOOZE');

  if (snooze && snooze.snoozeUntil > ts()) {
    return true;
  }

  return false;
};

export const getCameraType = (camera?: Camera) => {
  if (camera instanceof ArcRotateCamera) {
    return 'arc';
  } else if (camera instanceof FreeCamera) {
    return 'free';
  }

  return 'unknown';
};

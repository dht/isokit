import {
  Scene,
  Engine,
  GroundMesh,
  Light,
  SpritePackedManager,
  PositionGizmo,
  GizmoManager,
} from '@babylonjs/core';

export let DEBUG = true;
export let DEBUG_LEVEL = 1;

export let scene: Scene,
  engine: Engine,
  ground: GroundMesh,
  light: Light,
  gizmo: GizmoManager,
  useSelector: any,
  useDispatch: any;

export const setScene = (value: Scene) => {
  scene = value;
};

export const setEngine = (value: Engine) => {
  engine = value;
};

export const setGizmo = (value: GizmoManager) => {
  gizmo = value;
};

export const setDebug = (value: boolean) => {
  DEBUG = value;
};

export const setRedux = (useSelectorMethod: any, useDispatchMethod: any) => {
  useSelector = useSelectorMethod;
  useDispatch = useDispatchMethod;
};

export const packs: Record<string, SpritePackedManager> = {};
export const sounds: Record<string, HTMLAudioElement> = {};

export const logTime = (message: string, level: number = 3) => {
  if (!DEBUG || DEBUG_LEVEL < level) {
    return;
  }

  console.time(message);
};

export const logTimeEnd = (message: string, level: number = 3) => {
  if (!DEBUG || DEBUG_LEVEL < level) {
    return;
  }

  console.timeEnd(message);
};

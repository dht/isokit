import { Vector3 } from '@babylonjs/core';

export type Json = Record<string, any>;

export type IIsoStore = {
  isoState: IIsoState;
  layers: IIsoLayers;
  playState: IPlayState;
  sceneItems: ISceneItems;
  groups: IGroups;
  dots: IDots;
  control: IControl;
  shots: IShots;
};

export type IIsoState = {
  cameraId: string;
  groupId: string;
  meshId: string;
  dotId: string;
  layerId: string;
  paramsId: string;
  shotId: string;
  focusedShotId: string;
  isArc: boolean;
  isAudioReady: boolean;
  isBoardReady: boolean;
  isDataReady: boolean;
  isSceneReady: boolean;
  isCenterBallOn: boolean;
  isSetPieceOn: boolean;
  musicUrl: string;
  isMusicReady: boolean;
  voiceUrl: string;
  isVoiceReady: boolean;
  waveMode: WaveMode;
  isPerspectiveOn: boolean;
  isGizmoOn: boolean;
  isVolumeOn: boolean;
  isSyncOn: boolean;
  isBezierOn: boolean;
  lastMoveTimestamp: number;
  isDimmerOn: boolean;
  range: number[];
  isRangeActive: boolean;
  totalDuration: number;
  timelineWidth: number;
};

export type Layer = 'dots' | 'viz' | 'sky' | 'hud' | 'sfx' | 'vfx' | 'txt' | 'vce' | 'ani' | 'scl';

export type IIsoLayer = {
  id: string;
  order: number;
  isActive: boolean;
};

export type IIsoLayers = Record<string, IIsoLayer>;

export type IPlayState = {
  startTime: number;
  currentTime: number;
  playbackSpeed: number;
  playbackStatus: 'idle' | 'playing';
};

export type ISceneItem = {
  id: string;
  groupId?: string;
  itemType: ItemType;
  params?: Json;
  isCamera?: boolean;

  // transient
  isSelected?: boolean;
};

export type IGroup = {
  id: string;
  itemIds: string[];
  itemType: 'group';
  params?: Json;
};

export type IGroups = Record<string, IGroup>;

export type ISceneItems = Record<string, ISceneItem>;

export type IControl = {
  pos: IPosFlat;
  dot?: IDot;
  isDot: boolean;
  isSetPiece: boolean;
  formType: DotType;
  isEmpty?: boolean;
  emptyMessage?: string;
};

export type DotType =
  | 'mesh'
  | 'camera-universal'
  | 'camera-arc'
  | 'camera'
  | 'viz'
  | 'sky'
  | 'hud'
  | 'sfx'
  | 'vfx'
  | 'txt'
  | 'vce'
  | 'ani'
  | 'scl';

export type IDotBase = {
  id: string;
  timestamp: number;
  params?: Json;
  layerId: Layer;
  isSetPiece?: boolean;
  shotId?: string;
  dotType: DotType;

  // transient
  isPlayed?: boolean;
  isGenerated?: boolean;
  isSelected?: boolean;
  skip?: boolean;
};

export type IDot = IDotBase & {
  itemId: string;
  params?: Partial<IPosFlat | IExtraParams>;
};

export type IDots = Record<string, IDot>;

export type IShot = {
  id: string;
  timestamp: number;
  name: string;

  // transient
  duration: number;
  isSelected?: boolean;
  isFocused?: boolean;
};

export type IShots = Record<string, IShot>;

// ================== types ==================
export type Arc = {
  alpha: number;
  beta: number;
  radius: number;
};

export type Vector = {
  x: number;
  y: number;
  z: number;
};

export type ItemType =
  | 'mesh' //
  | 'camera'
  | 'light'
  | 'sfx'
  | 'video';

export enum WaveMode {
  None = '0',
  Faded = '0.1',
  Full = '1',
}

export type IRegion = {
  start: number;
  end: number;
  duration: number;
};

export type IPosFlat = Partial<{
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  sx: number;
  sy: number;
  sz: number;
  alpha: number;
  beta: number;
  radius: number;
  b1: number;
  b2: number;
  b3: number;
  b4: number;
  l: number;
  v: number;
  isAnimated: boolean;

  // transient
  replace?: boolean;
}>;

export type IExtraParams = {
  url?: string;
  show?: boolean;
  hudId?: string;
};

// ================== utilities ==================
export interface StoreDefinition {
  name: string;
  initialState: Json;
  reducers: any;
  middlewares: any;
  enhancers: any;
  sagas: any;
  sagasContext: any;
  enableDevtoolsExtension: boolean;
  sagaMonitor: any;
}

export type IDeepPos = {
  position: Vector3;
  rotation: Vector3;
  scaling: Vector3;
  radius: number;
  alpha: number;
  beta: number;
};

export type AllPos = {
  cameraActive: IPosFlat;
  cameraSelected: IPosFlat;
  meshSelected?: IPosFlat;
  meshes: Record<string, IPosFlat>;
};

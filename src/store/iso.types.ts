export type Json = Record<string, any>;

export type IIsoStore = {
  isoState: IIsoState;
  layers: IIsoLayers;
  playState: IPlayState;
  sceneItems: ISceneItems;
  groups: IGroups;
  dots: IDots;
};

export type IIsoState = {
  cameraId: string;
  groupId: string;
  meshId: string;
  dotId: string;
  layerId: string;
  isArc: boolean;
  isAudioReady: boolean;
  isBoardReady: boolean;
  isDataReady: boolean;
  isSceneReady: boolean;
  musicUrl: string;
  isMusicReady: boolean;
  voiceUrl: string;
  isVoiceReady: boolean;
  waveMode: WaveMode;
  isPerspectiveOn: boolean;
  isPositionPadOn: boolean;
  isVolumeOn: boolean;
  isBezierOn: boolean;
  lastMoveTimestamp: number;
  isDimmerOn: boolean;
  range: number[];
  isRangeActive: boolean;
  totalDuration: number;
  showLog: boolean;
};

export type Layer = 'dots' | 'viz' | 'sky' | 'hud' | 'sfx' | 'vfx';

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
  isGroup?: boolean;

  // transient
  isSelected?: boolean;
};

export type IGroup = ISceneItem & {
  itemIds: string[];
  itemType: 'group';
};

export type IGroups = Record<string, IGroup>;

export type ISceneItems = Record<string, ISceneItem>;

export type IDotBase = {
  id: string;
  timestamp: number;
  params?: Json;
  layerId: Layer;
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

export type IPosFlat = Partial<{
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
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
  clearEmpty?: boolean;
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

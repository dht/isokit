export type Json = Record<string, any>;

export type IIsoStore = {
  isoState: IIsoState;
  play: IPlay;
  items: IItems;
  groups: IGroups;
  dots: IDots;
  visDots: IVisDots;
  sfxDots: ISfxDots;
};

export type IIsoState = {
  cameraId: string;
  groupId: string;
  meshId: string;
  dotId: string;
  isArc: boolean;
  isAudioReady: boolean;
  isBoardReady: boolean;
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
};

export type IPlay = {
  startTime: number;
  currentTime: number;
  playbackSpeed: number;
  playbackStatus: 'idle' | 'playing';
};

export type IItem = {
  id: string;
  groupId?: string;
  itemType: ItemType;
  params?: Json;
  isCamera?: boolean;
  isGroup?: boolean;

  // transient
  isSelected?: boolean;
};

export type IGroup = IItem & {
  itemIds: string[];
  itemType: 'group';
};

export type IGroups = Record<string, IGroup>;

export type IItems = Record<string, IItem>;

export type IDot = {
  id: string;
  itemId: string;
  timestamp: number;
  params?: Partial<IPosFlat>;

  // transient
  isGenerated?: boolean;
  isSelected?: boolean;
  skip?: boolean;
};

export type IDots = Record<string, IDot>;

export type IVisDot = {
  id: string;
  itemId: string;
  timestamp: number;
  show: boolean;
  skip?: boolean;
};

export type IVisDots = Record<string, IVisDot>;

export type ISfxDot = {
  id: string;
  timestamp: number;
  url: string;
  params?: Json;
  skip?: boolean;
};

export type ISfxDots = Record<string, ISfxDot>;

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
  | 'video'
  | 'hud'
  | 'bk'
  | 'group';

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

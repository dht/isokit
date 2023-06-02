import { IIsoStore, WaveMode } from './iso.types';

export const initialState: IIsoStore = {
  isoState: {
    cameraId: '',
    meshId: '',
    groupId: '',
    dotId: '',
    layerId: '',
    isAudioReady: false,
    isBoardReady: false,
    isDataReady: false,
    isSceneReady: false,
    musicUrl: 'http://localhost:3001/sounds/modelz/modelz.mp3',
    isMusicReady: false,
    voiceUrl: 'http://localhost:3001/sounds/modelz/modelz-voice.mp3',
    isVoiceReady: false,
    waveMode: WaveMode.Full,
    isPerspectiveOn: false,
    isPositionPadOn: false,
    isVolumeOn: true,
    isBezierOn: false,
    isArc: false,
    lastMoveTimestamp: Date.now(),
    isDimmerOn: false,
    range: [0, 1],
    isRangeActive: true,
    totalDuration: 0,
    showLog: false,
  },
  sceneItems: {
    sound: {
      id: 'sound',
      itemType: 'sfx',
      params: {
        url: 'http://localhost:3001/scenes/s1.png',
      },
    },
  },
  layers: {
    dots: {
      id: 'dots',
      order: 1,
      isActive: true,
    },
    viz: {
      id: 'viz',
      order: 2,
      isActive: true,
    },
    sky: {
      id: 'sky',
      order: 3,
      isActive: true,
    },
    hud: {
      id: 'hud',
      order: 4,
      isActive: true,
    },
    sfx: {
      id: 'sfx',
      order: 5,
      isActive: true,
    },
    vfx: {
      id: 'vfx',
      order: 6,
      isActive: true,
    },
  },
  playState: {
    startTime: 0,
    currentTime: 0,
    playbackSpeed: 1,
    playbackStatus: 'idle',
  },
  groups: {
    car: {
      id: 'car',
      itemIds: [
        'Object_2',
        'Object_3',
        'Object_4',
        'Object_5',
        'Object_6',
        'Object_7',
        'Object_8',
        'Object_9',
        'Object_10',
        'Object_11',
        'Object_12',
        'Object_13',
      ],
      isGroup: true,
      itemType: 'group',
      params: {
        position: { x: 0, y: 0, z: 0 },
      },
    },
  },
  dots: {
    g1: {
      id: 'g1',
      itemId: 'g1',
      timestamp: 10,
      layerId: 'dots',
      params: {
        x: -40,
        y: 0,
        z: -40,
        b1: 0.5,
        b2: 0.5,
        b3: 0.5,
        b4: 0.5,
        isAnimated: true,
        l: 1,
      },
      isSelected: false,
    },
    v1: {
      id: 'v1',
      itemId: 'g1',
      layerId: 'viz',
      timestamp: 0,
      params: {
        show: true,
      },
    },
    sfx1: {
      id: 'sfx1',
      layerId: 'sfx',
      itemId: '',
      timestamp: 19800,
      params: {
        url: 'http://localhost:3001/sounds/modelz/flyby.mp3',
        volume: 0,
      },
    },
    vfx1: {
      id: 'vfx1',
      layerId: 'vfx',
      itemId: '',
      timestamp: 19800,
      params: {
        url: 'http://localhost:3001/sounds/modelz/flyby.mp3',
        volume: 0,
      },
    },
    sky1: {
      id: 'sky1',
      layerId: 'sky',
      itemId: '',
      timestamp: 10,
      params: {
        url: 'http://localhost:3001/scenes/s2.png',
      },
    },
    h1: {
      id: 'h1',
      timestamp: 0,
      itemId: '',
      layerId: 'hud',
      params: {
        hudId: 'h1',
      },
    },
  },
};

import { IIsoStore, WaveMode } from '../iso.types';
import { dots } from './iso.initialState.dots';
import { sfxDots } from './iso.initialState.sfxDots';
import { visDots } from './iso.initialState.visDots';

export const initialState: IIsoStore = {
  isoState: {
    cameraId: '',
    meshId: '',
    groupId: '',
    dotId: '',
    isAudioReady: false,
    isBoardReady: false,
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
  },
  items: {
    skyPlane: {
      id: 'skyPlane',
      itemType: 'bk',
      params: {
        url: 'http://localhost:3001/scenes/sf6_nx.png',
      },
    },
  },
  play: {
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
  dots,
  visDots,
  sfxDots,
};

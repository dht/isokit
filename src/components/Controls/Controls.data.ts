import { IPosFlat } from '../../store/iso.types';

export const positionInputsMesh = [
  {
    id: 'x',
    fieldType: 'number',
  },
  {
    id: 'rx',
    mode: 'vector',
    fieldType: 'number',
  },
  {
    id: 'sx',
    fieldType: 'number',
  },
  {
    id: 'y',
    fieldType: 'number',
  },
  {
    id: 'ry',
    mode: 'vector',
    fieldType: 'number',
  },
  {
    id: 'sy',
    fieldType: 'number',
  },
  {
    id: 'z',
    fieldType: 'number',
  },
  {
    id: 'rz',
    mode: 'vector',
    fieldType: 'number',
  },
  {
    id: 'sz',
    fieldType: 'number',
  },
];

export const positionInputsCameraUniversal = [
  {
    id: 'x',
    fieldType: 'number',
  },

  {
    id: 'y',
    fieldType: 'number',
  },
  {
    id: 'z',
    fieldType: 'number',
  },
  {
    id: 'ry',
    mode: 'vector',
    fieldType: 'number',
  },
  {
    id: 'rx',
    mode: 'vector',
    fieldType: 'number',
  },
  {
    id: 'rz',
    mode: 'vector',
    fieldType: 'number',
  },
];

export const positionInputsCameraArc = [
  {
    id: 'x',
    fieldType: 'number',
  },
  {
    id: 'y',
    fieldType: 'number',
  },
  {
    id: 'z',
    fieldType: 'number',
  },
  {
    id: 'alpha',
    mode: 'arc',
    fieldType: 'number',
  },
  {
    id: 'beta',
    mode: 'arc',
    fieldType: 'number',
  },
  {
    id: 'radius',
    mode: 'arc',
    fieldType: 'number',
  },
];

export const bezierInputs = [
  {
    id: 'b1',
    fieldType: 'number',
  },
  {
    id: 'b2',
    fieldType: 'number',
  },
  {
    id: 'b3',
    fieldType: 'number',
  },
  {
    id: 'b4',
    fieldType: 'number',
  },
  {
    id: 'l',
    fieldType: 'checkbox',
  },
];

export const visibilityInputs = [
  {
    id: 'show',
    fieldType: 'checkbox',
  },
];

export const urlInputs = [
  {
    id: 'url',
    fieldType: 'url',
  },
];

export const hudInputs = [
  {
    id: 'hudId',
    fieldType: 'text',
  },
];

export const emptyFlatPos: any = {
  x: '',
  y: '',
  z: '',
  rx: '',
  ry: '',
  rz: '',
  alpha: '',
  beta: '',
  radius: '',
  b1: '',
  b2: '',
  b3: '',
  b4: '',
  l: '',
  v: '',
  isAnimated: false,
};

export const inputsByType: any = {
  mesh: positionInputsMesh,
  universal: positionInputsCameraUniversal,
  arc: positionInputsCameraArc,
  viz: visibilityInputs,
  sfx: urlInputs,
  vfx: urlInputs,
  hud: hudInputs,
};

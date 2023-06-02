import { IPosFlat } from '../../store/iso.types';

export const positionInputs = [
  {
    id: 'x',
  },
  {
    id: 'rx',
    mode: 'vector',
  },
  {
    id: 'alpha',
    mode: 'arc',
  },
  {
    id: 'y',
  },
  {
    id: 'ry',
    mode: 'vector',
  },
  {
    id: 'beta',
    mode: 'arc',
  },
  {
    id: 'z',
  },
  {
    id: 'rz',
    mode: 'vector',
  },
  {
    id: 'radius',
    mode: 'arc',
  },
];

export const bezierInputs = [
  {
    id: 'b1',
  },
  {
    id: 'b2',
  },
  {
    id: 'b3',
  },
  {
    id: 'b4',
  },
  {
    id: 'l',
  },
  {
    id: 'v',
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

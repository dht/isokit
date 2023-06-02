import { Layer } from '../../iso.types';

export const layerMap: Record<Layer, string> = {
  dots: 'L1',
  viz: 'L2',
  sky: 'L3',
  hud: 'L4',
  sfx: 'L5',
  vfx: 'L6',
  txt: 'L7',
  vce: 'L8',
  ani: 'L9',
};

export const paramsMap: Record<string, string> = {
  mesh: 'C1',
  dot: 'C2',
  camera: 'C3',
  setPiece: 'C4',
};

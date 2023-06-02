import { IDots } from '../iso.types';
import arc from './dots/dots.arc.json';
import car from './dots/dots.car.json';
import g1 from './dots/dots.g1.json';
import g2 from './dots/dots.g2.json';
import g3 from './dots/dots.g3.json';
import hud from './dots/dots.hud.json';
import skyPlane from './dots/dots.skyPlane.json';
import universal from './dots/dots.universal.json';

export const dots: IDots = {
  ...arc,
  ...car,
  ...g1,
  ...g2,
  ...g3,
  ...hud,
  ...skyPlane,
  ...universal,
};

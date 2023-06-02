import { invokeEvent } from 'shared-base';
import { IDot } from '../store/iso.types';

export function* playHudDot(dot: IDot) {
  const { itemId, params } = dot;
  const { show } = params ?? {};

  invokeEvent('startHud', {
    itemId,
    show,
  });
}

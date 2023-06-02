import { createSelector } from 'reselect';
import * as raw from './iso.selectors.raw';

export const $dotCurrent = createSelector(
  raw.$rawDots,
  raw.$rawVizDots,
  raw.$rawSkyDots,
  raw.$rawSfxDots,
  raw.$rawVfxDots,
  raw.$rawHudDots,
  raw.$rawIsoState,
  (dots, vizDots, skyDots, sfxDots, vfxDots, hudDots, isoState) => {
    const { dotId, layerId } = isoState;

    switch (layerId) {
      case 'dots':
        return dots[dotId];
      case 'viz':
        return vizDots[dotId];
      case 'sky':
        return skyDots[dotId];
      case 'sfx':
        return sfxDots[dotId];
      case 'vfx':
        return vfxDots[dotId];
      case 'hud':
        return hudDots[dotId];
    }
  }
);

export const $cameraCurrent = createSelector(
  raw.$rawSceneItems,
  raw.$rawIsoState,
  (items, isoState) => {
    const { cameraId } = isoState;

    return items[cameraId];
  }
);

import { createSelector } from 'reselect';
import { sortBy } from 'shared-base';
import * as base from './iso.selectors.base';
import * as raw from './iso.selectors.raw';
import * as layers from './iso.selectors.layers';
import { IRegion } from '../iso.types';

export const $dots = createSelector(raw.$rawDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

export const $vizDots = createSelector(raw.$rawVizDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

export const $dotsCurrentMesh = createSelector(raw.$rawDots, raw.$rawIsoState, (dots, isoState) => {
  const { dotId, meshId } = isoState;

  return Object.values(dots)
    .filter((dot) => dot.itemId === meshId)
    .filter((dot) => !dot.isGenerated)
    .map((dot) => {
      const isSelected = dotId === dot.id;
      return { ...dot, isSelected };
    })
    .sort(sortBy('timestamp'));
});

export const $dotsCurrentCamera = createSelector(
  raw.$rawDots,
  raw.$rawIsoState,
  (dots, isoState) => {
    const { dotId, cameraId } = isoState;

    return Object.values(dots)
      .filter((dot) => dot.itemId === cameraId)
      .filter((dot) => !dot.isGenerated)
      .map((dot) => {
        const isSelected = dotId === dot.id;
        return { ...dot, isSelected };
      })
      .sort(sortBy('timestamp'));
  }
);

export const $dotsCurrentViz = createSelector(
  raw.$rawVizDots,
  raw.$rawIsoState,
  (dots, isoState) => {
    const { dotId, meshId } = isoState;

    return Object.values(dots)
      .filter((dot) => dot.itemId === meshId)
      .filter((dot) => !dot.isGenerated)
      .map((dot) => {
        const isSelected = dotId === dot.id;
        return { ...dot, isSelected };
      })
      .sort(sortBy('timestamp'));
  }
);

export const $timelineRegion = createSelector(base.$shots, raw.$rawIsoState, (shots, isoState) => {
  const { focusedShotId, totalDuration } = isoState;

  const output: IRegion = {
    start: 0,
    end: totalDuration * 1000,
    duration: totalDuration * 1000,
  };

  const shot = shots.find((item) => item.id === focusedShotId);

  if (shot) {
    const { timestamp, duration } = shot;
    output.start = timestamp;
    output.duration = duration;
    output.end = timestamp + duration;
  }

  return output;
});

export const $timeline = createSelector(
  raw.$rawIsoState,
  $dotsCurrentMesh,
  $dotsCurrentCamera,
  $dotsCurrentViz,
  layers.$dotsCurrentHud,
  layers.$dotsCurrentSfx,
  layers.$dotsCurrentSky,
  layers.$dotsCurrentVfx,
  (isoState, dotsMesh, dotsCamera, dotsViz, dotsHud, dotsSfx, dotsSky, dotsVfx) => {
    const { layerId, meshId } = isoState;

    switch (layerId) {
      case 'dots':
        return meshId ? dotsMesh : dotsCamera;
      case 'viz':
        return dotsViz;
      case 'hud':
        return dotsHud;
      case 'sfx':
        return dotsSfx;
      case 'sky':
        return dotsSky;
      case 'vfx':
        return dotsVfx;
      default:
        return [];
    }
  }
);

export const $timelineForRegion = createSelector($timeline, $timelineRegion, (timeline, region) => {
  const { start, end } = region;

  return timeline.filter((dot) => {
    const { timestamp } = dot;
    return timestamp >= start && timestamp <= end;
  });
});

export const $dotCurrent = createSelector(
  raw.$rawIsoState,
  raw.$rawDots,
  raw.$rawVizDots,
  raw.$rawSkyDots,
  raw.$rawSfxDots,
  raw.$rawVfxDots,
  raw.$rawHudDots,
  (isoState, dots, vizDots, skyDots, sfxDots, vfxDots, hudDots) => {
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

export const $dotNext = createSelector(
  [raw.$rawDots, (_state, dotId) => dotId],
  (dots, dotId: number) => {
    const dot = dots[dotId];

    if (!dot) {
      return null;
    }

    const { itemId } = dot;

    const dotsForItem = Object.values(dots)
      .filter((dot) => dot.itemId === itemId)
      .sort(sortBy('timestamp'));

    const nextDot = dotsForItem.find((d) => d.timestamp > dot.timestamp);

    return nextDot;
  }
);

export const $dotsForPlayback = createSelector(
  [$dots, (_state, currentTime) => currentTime],
  (dots, currentTime: number) => {
    return dots.filter((dot) => {
      const { isPlayed, timestamp, skip } = dot;
      const delta = currentTime * 1000 - timestamp;
      const isInDelta = delta >= 0 && delta < 100;

      return !isPlayed && isInDelta && !skip;
    });
  }
);

export const $vizDotsForPlayback = createSelector(
  [$vizDots, (_state, currentTime) => currentTime],
  (dots, currentTime: number) => {
    return dots.filter((dot) => {
      const { isPlayed, timestamp, skip } = dot;
      const delta = currentTime * 1000 - timestamp;
      const isInDelta = delta >= 0 && delta < 100;

      return !isPlayed && isInDelta && !skip;
    });
  }
);

export const $dotsForFrame = createSelector(
  [
    raw.$rawSceneItems,
    $dots,
    $vizDots,
    layers.$skyDots,
    layers.$sfxDots,
    layers.$vfxDots,
    layers.$hudDots,
    (_state, currentTime) => currentTime,
  ],
  (items, dots, vizDots, skyDots, sfxDots, vfxDots, hudDots, currentTime: number) => {
    // console.log('items ->', items);
  }
);

export const $dotsPrevious = createSelector(
  [$timeline, (_state, currentTime) => currentTime],
  (dots, currentTime: number) => {
    const filteredDots = dots.filter((dot) => {
      const { timestamp } = dot;
      return timestamp < currentTime;
    });

    return filteredDots.pop();
  }
);

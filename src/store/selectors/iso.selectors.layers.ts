import { createSelector } from 'reselect';
import { sortBy } from 'shared-base';
import * as raw from './iso.selectors.raw';

export const $dots = createSelector(raw.$rawDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

export const $vizDots = createSelector(raw.$rawVizDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

export const $sfxDots = createSelector(raw.$rawSfxDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

export const $vfxDots = createSelector(raw.$rawVfxDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

export const $skyDots = createSelector(raw.$rawSkyDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

export const $hudDots = createSelector(raw.$rawHudDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

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

export const $sfxDotsForPlayback = createSelector(
  [$sfxDots, (_state, currentTime) => currentTime],
  (dots, currentTime: number) => {
    return dots.filter((dot) => {
      const { isPlayed, timestamp, skip } = dot;
      const delta = currentTime * 1000 - timestamp;
      const isInDelta = delta >= 0 && delta < 100;

      return !isPlayed && isInDelta && !skip;
    });
  }
);

export const $hudDotsForPlayback = createSelector(
  [$hudDots, (_state, currentTime) => currentTime],
  (dots, currentTime: number) => {
    return dots.filter((dot) => {
      const { isPlayed, timestamp, skip } = dot;
      const delta = currentTime * 1000 - timestamp;
      const isInDelta = delta >= 0 && delta < 100;

      return !isPlayed && isInDelta && !skip;
    });
  }
);

export const $skyDotsForPlayback = createSelector(
  [$skyDots, (_state, currentTime) => currentTime],
  (dots, currentTime: number) => {
    return dots.filter((dot) => {
      const { isPlayed, timestamp, skip } = dot;
      const delta = currentTime * 1000 - timestamp;
      const isInDelta = delta >= 0 && delta < 100;

      return !isPlayed && isInDelta && !skip;
    });
  }
);

export const $dotsCurrentSky = createSelector(
  raw.$rawSkyDots,
  raw.$rawIsoState,
  (dots, isoState) => {
    const { dotId } = isoState;

    return Object.values(dots)
      .filter((dot) => !dot.isGenerated)
      .map((dot) => {
        const isSelected = dotId === dot.id;
        return { ...dot, isSelected };
      })
      .sort(sortBy('timestamp'));
  }
);

export const $dotsCurrentSfx = createSelector(
  raw.$rawSfxDots,
  raw.$rawIsoState,
  (dots, isoState) => {
    const { dotId } = isoState;

    return Object.values(dots)
      .filter((dot) => !dot.isGenerated)
      .map((dot) => {
        const isSelected = dotId === dot.id;
        return { ...dot, isSelected };
      })
      .sort(sortBy('timestamp'));
  }
);

export const $dotsCurrentHud = createSelector(
  raw.$rawHudDots,
  raw.$rawIsoState,
  (dots, isoState) => {
    const { dotId } = isoState;

    return Object.values(dots)
      .filter((dot) => !dot.isGenerated)
      .map((dot) => {
        const isSelected = dotId === dot.id;
        return { ...dot, isSelected };
      })
      .sort(sortBy('timestamp'));
  }
);

export const $dotsCurrentVfx = createSelector(
  raw.$rawVfxDots,
  raw.$rawIsoState,
  (dots, isoState) => {
    const { dotId } = isoState;

    return Object.values(dots)
      .filter((dot) => !dot.isGenerated)
      .map((dot) => {
        const isSelected = dotId === dot.id;
        return { ...dot, isSelected };
      })
      .sort(sortBy('timestamp'));
  }
);

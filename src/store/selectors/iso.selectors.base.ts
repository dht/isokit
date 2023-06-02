import { createSelector } from 'reselect';
import * as raw from './iso.selectors.raw';
import { sortBy } from 'shared-base';

export const $totalDuration = createSelector(raw.$rawIsoState, (isoState) => {
  return isoState.totalDuration;
});

export const $totalDurationMillis = createSelector(raw.$rawIsoState, (isoState) => {
  return isoState.totalDuration * 1000;
});

export const $cameraCurrent = createSelector(
  raw.$rawSceneItems,
  raw.$rawIsoState,
  (items, isoState) => {
    const { cameraId } = isoState;

    return items[cameraId];
  }
);

export const $selectedType = createSelector(raw.$rawIsoState, (isoState) => {
  const { meshId, cameraId } = isoState;

  if (meshId) {
    return 'mesh';
  }

  if (cameraId) {
    return cameraId === 'universal' ? 'universal' : 'arc';
  }
});

export const $selectedPos = createSelector(raw.$rawIsoState, raw.$rawDots, (isoState, dots) => {
  const { paramsId, meshId, cameraId, dotId } = isoState;

  let isEmpty = false;

  const isDot = !!dotId;
  const isMesh = !!meshId;
  let initialValues: Json = {};

  switch (paramsId) {
    case 'mesh':
      isEmpty = isMesh;
      break;

    case 'dot':
      isEmpty = isDot;
      const dot = dots[dotId];
      initialValues = dot?.params ?? {};
      break;
  }

  return {
    paramsId,
    isDot: isDot && paramsId === 'dot',
    isMesh,
    isEmpty,
    isArc: cameraId === 'universal',
    initialValues,
  };
});

export const $shots = createSelector(raw.$rawShots, raw.$rawIsoState, (shots, isoState) => {
  const { shotId, focusedShotId, totalDuration } = isoState;

  const sorted = Object.values(shots).sort(sortBy('timestamp'));

  return sorted.map((shot, index) => {
    const { timestamp } = shot;
    const nextShot = sorted[index + 1] ?? { timestamp: totalDuration * 1000 };
    const duration = nextShot.timestamp - timestamp;
    const isSelected = shot.id === shotId;
    const isFocused = shot.id === focusedShotId;

    return {
      ...shot,
      duration,
      isSelected,
      isFocused,
    };
  });
});

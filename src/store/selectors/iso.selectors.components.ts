import { createSelector } from 'reselect';
import { sortBy } from 'shared-base';
import * as raw from './iso.selectors.raw';
import { toObject } from './utils/object';
import { $dotCurrent } from './iso.selectors.base';

// ObjectSelector
export const $cameraForSelector = createSelector(
  raw.$rawSceneItems,
  raw.$rawIsoState,
  (items, isoState) => {
    const { cameraId, meshId } = isoState;

    const filterIds = ['__root__', 'BackgroundHelper'];
    const filteredItems = Object.values(items)
      .filter((item) => !item.groupId)
      .filter((item) => !filterIds.includes(item.id))
      .filter((item) => item.isCamera)
      .map((item) => {
        const isSelected =
          (item.isCamera && cameraId === item.id) || //
          (!item.isCamera && meshId === item.id);

        return {
          ...item,
          isSelected,
        };
      });

    return filteredItems.sort(sortBy('isCamera'));
  }
);

// ObjectSelector
export const $layersForSelector = createSelector(
  raw.$rawLayers,
  raw.$rawIsoState,
  (layers, isoState) => {
    const { layerId } = isoState;

    const filteredItems = Object.values(layers)
      .filter((layer) => layer.isActive)
      .map((layer) => {
        const isSelected = layer.id === layerId;

        return {
          id: layer.id,
          itemType: 'layer',
          isSelected,
        };
      });

    return filteredItems.sort(sortBy('order'));
  }
);

export const $meshesForSelector = createSelector(
  raw.$rawSceneItems,
  raw.$rawIsoState,
  (items, isoState) => {
    const { cameraId, meshId } = isoState;

    const filterIds = ['__root__', 'BackgroundHelper'];
    const filteredItems = Object.values(items)
      .filter((item) => !item.groupId && !item.isCamera)
      .filter((item) => !filterIds.includes(item.id))
      .map((item) => {
        const isSelected =
          (item.isCamera && cameraId === item.id) || //
          (!item.isCamera && meshId === item.id);

        return {
          ...item,
          isSelected,
        };
      });

    return filteredItems.sort(sortBy('id'));
  }
);

export const $uiToggles = createSelector(raw.$rawIsoState, (isoState) => {
  const { isPositionPadOn, isVolumeOn } = isoState;

  return {
    isSyncPositionOn: true,
    logs: true,
    isPositionPadOn,
    isVolumeOn,
  };
});

export const $easingToggles = createSelector(raw.$rawIsoState, (isoState) => {
  const { isBezierOn } = isoState;

  return {
    easingNone: true,
    easingLinear: true,
    easingInOut: true,
    isBezierOn,
  };
});

export const $dotCurrentBezier = createSelector($dotCurrent, (dot) => {
  if (!dot) {
    return null;
  }

  const { params = {} } = dot;
  const { b1 = '', b2 = '', b3 = '', b4 = '' } = params;

  return [b1, b2, b3, b4];
});

export const $dotsForClipboard = createSelector(
  raw.$rawDots,
  raw.$rawIsoState,
  (dots, isoState) => {
    const { cameraId, meshId, dotId } = isoState;

    if (dotId) {
      return toObject([dots[dotId]]);
    }

    const items = Object.values(dots)
      .filter((dot) => {
        return dot.itemId === cameraId || dot.itemId === meshId;
      })
      .filter((dot) => {
        return !dot.isGenerated;
      });

    return toObject(items);
  }
);

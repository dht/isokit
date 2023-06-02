import { createSelector } from 'reselect';
import { sortBy } from 'shared-base';
import { $dotCurrent } from './iso.selectors.playback';
import * as raw from './iso.selectors.raw';
import { layerMap, paramsMap } from './maps';
import { toObject } from './utils/object';
import { calculatePermutationIndex } from './utils/uiPermutations';

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

    const filteredItems = Object.values(layers).map((layer) => {
      const isSelected = layer.id === layerId;

      return {
        id: layer.id,
        itemType: 'layer',
        isActive: layer.isActive,
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
  const { isGizmoOn, isVolumeOn, isCenterBallOn } = isoState;

  return {
    restart: true,
    isGizmoOn,
    isCenterBallOn,
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

export const $paramsSwitch = createSelector(raw.$rawIsoState, (isoState) => {
  return {
    mesh: true,
    camera: true,
    dot: true,
    setPiece: true,
  };
});

export const $uiPermutation = createSelector(
  raw.$rawIsoState,
  raw.$rawPlayState,
  (isoState, playState) => {
    const { meshId, dotId, paramsId, focusedShotId, layerId, isSyncOn } = isoState;
    const { playbackStatus } = playState;

    const perm: any = {
      object: meshId ? 'OM' : 'OC',
      dot: dotId ? 'DO' : 'DN',
      layer: (layerMap as any)[layerId],
      control: (paramsMap as any)[paramsId],
      playback: playbackStatus === 'idle' ? 'PI' : 'PP',
      region: focusedShotId ? 'RS' : 'R0',
      sync: isSyncOn ? 'SY' : 'SN',
    };

    const index = calculatePermutationIndex(perm);

    return {
      perm,
      index,
    };
  }
);

import { createSelector } from 'reselect';
import { sortBy } from 'shared-base';
import * as raw from './iso.selectors.raw';
import { $dotCurrent } from './iso.selectors.singles';

export const $item = createSelector(
  [raw.$rawItems, (_state, itemId) => itemId],
  (items, itemId: number) => {
    return items[itemId];
  }
);

export const $dots = createSelector(raw.$rawDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

export const $visDots = createSelector(raw.$rawVisDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

export const $sfxDots = createSelector(raw.$rawSfxDots, (dots) => {
  return Object.values(dots).sort(sortBy('timestamp'));
});

export const $itemsForSelector = createSelector(
  raw.$rawItems,
  raw.$rawIsoState,
  (items, isoState) => {
    const { cameraId, meshId } = isoState;

    const filterIds = ['__root__', 'BackgroundHelper'];
    const filteredItems = Object.values(items)
      .filter((item) => !item.groupId)
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

    return filteredItems.sort(sortBy('isCamera'));
  }
);

export const $dotsCurrent = createSelector(raw.$rawDots, raw.$rawIsoState, (dots, isoState) => {
  const { dotId, cameraId, meshId } = isoState;

  return Object.values(dots)
    .filter((dot) => {
      return dot.itemId === cameraId || dot.itemId === meshId;
    })
    .filter((dot) => {
      return !dot.isGenerated;
    })
    .map((dot) => {
      const isSelected = dotId === dot.id;

      return {
        ...dot,
        isSelected,
      };
    });
});

export const $dotsForClipboard = createSelector(
  raw.$rawDots,
  raw.$rawIsoState,
  (dots, isoState) => {
    const { cameraId, meshId } = isoState;

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

export const $uiToggles = createSelector(raw.$rawIsoState, (isoState) => {
  const { isPositionPadOn, isVolumeOn } = isoState;

  return {
    isSyncPositionOn: true,
    skipPrevious: true,
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

export const toObject = (arr: any[]) => {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
};

export const $dotCurrentBezier = createSelector($dotCurrent, (dot) => {
  if (!dot) {
    return null;
  }

  const { params = {} } = dot;
  const { b1 = '', b2 = '', b3 = '', b4 = '' } = params;

  return [b1, b2, b3, b4];
});

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

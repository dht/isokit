import { createSelector } from 'reselect';
import * as raw from './iso.selectors.raw';
import { sortBy } from 'shared-base';

export const $dotCurrent = createSelector(raw.$rawDots, raw.$rawIsoState, (dots, isoState) => {
  const { dotId } = isoState;
  return dots[dotId];
});

export const $itemCurrent = createSelector(
  raw.$rawItems,
  raw.$rawGroups,
  raw.$rawIsoState,
  (items, groups, isoState) => {
    const { cameraId, groupId } = isoState;

    if (groupId) {
      return groups[groupId];
    }

    return items[cameraId];
  }
);

export const $item = createSelector(
  [raw.$rawItems, (_state, itemId) => itemId],
  (items, itemId: number) => {
    return items[itemId];
  }
);

export const $dot = createSelector(
  [raw.$rawDots, (_state, dotId) => dotId],
  (dots, dotId: number) => {
    return dots[dotId];
  }
);

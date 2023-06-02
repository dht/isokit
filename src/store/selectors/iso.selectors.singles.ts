import { createSelector } from 'reselect';
import * as raw from './iso.selectors.raw';
import { sortBy } from 'shared-base';

export const $item = createSelector(
  [raw.$rawSceneItems, (_state, itemId) => itemId],
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

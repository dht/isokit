import { createSelector } from 'reselect';
import * as raw from './iso.selectors.raw';
import * as base from './iso.selectors.base';
import { sortBy } from 'shared-base';

export const $item = createSelector(
  [raw.$rawSceneItems, (_state, itemId) => itemId],
  (items, itemId: string) => {
    return items[itemId];
  }
);

export const $dot = createSelector(
  [raw.$rawDots, (_state, dotId) => dotId],
  (dots, dotId: string) => {
    return dots[dotId];
  }
);

export const $shot = createSelector(
  [base.$shots, (_state, shotId) => shotId],
  (shots, shotId: string) => {
    return shots.find((shot) => shot.id === shotId);
  }
);

import { createSelector } from 'reselect';
import * as raw from './iso.selectors.raw';
import { ISheetCell } from '../../components/Sheet/Sheet.types';
import { sortBy } from '../../utils/sort';
import { format } from '../../utils/format';

export const $setPieceDot = createSelector(raw.$rawIsoState, raw.$rawDots, (isoState, dots) => {
  const { meshId, cameraId, focusedShotId } = isoState;

  let relevantDots = Object.values(dots).filter((dot) => dot.isSetPiece);

  if (focusedShotId) {
    relevantDots = relevantDots.filter((dot) => dot.shotId === focusedShotId);
  }

  if (meshId) {
    relevantDots = relevantDots.filter((dot) => dot.itemId === meshId);
  } else {
    relevantDots = relevantDots.filter((dot) => dot.itemId === cameraId);
  }

  return relevantDots[0];
});

export const $sheets = createSelector(raw.$rawIsoState, raw.$rawDots, (isoState, dots) => {
  return Object.values(dots)
    .sort(sortBy(['timestamp', 'itemId', 'layerId']))
    .reduce((memo, dot, index) => {
      const { id, shotId, timestamp, params, layerId, itemId } = dot;

      if (itemId === 'skyPlane') {
        console.log('dot ->', dot);
      }

      let y = index + 1;
      let x = 1;

      function addColumn(value: any) {
        memo.push({
          id,
          cellType: 'value',
          x,
          y,
          value,
        });
        x++;
      }

      addColumn(index + 1);
      addColumn(shotId);
      addColumn(format.timestamp(timestamp));
      addColumn(itemId);
      addColumn(layerId);
      addColumn(params?.x);
      addColumn(params?.y);
      addColumn(params?.z);
      addColumn(params?.rx);
      addColumn(params?.ry);
      addColumn(params?.rz);
      addColumn(params?.alpha);
      addColumn(params?.beta);
      addColumn(params?.radius);

      return memo;
    }, [] as ISheetCell[]);
});

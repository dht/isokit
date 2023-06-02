import { useDispatch, useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { actions } from '../../store/iso.actions';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { PlayLine } from './PlayLine';

export type PlayLineContainerProps = {};

export function PlayLineContainer(_props: PlayLineContainerProps) {
  const dispatch = useDispatch();
  const isoState = useSelector(selectors.raw.$rawIsoState);
  const { range, isRangeActive } = isoState;

  const callbacks = useMemo(
    () => ({
      onMove: (index: number, newValue: number) => {
        const newRange = [...range];
        newRange[index] = newValue;

        dispatch(
          actions.isoState.patch({
            range: newRange,
          })
        );
      },
      onRange: (value: boolean) => {
        dispatch(
          actions.isoState.patch({
            isRangeActive: value,
          })
        );
      },
    }),
    [range]
  );
  return (
    <PlayLine
      range={range}
      isRangeActive={isRangeActive}
      totalDuration={isoState.totalDuration}
      callbacks={callbacks}
    />
  );
}

export default PlayLineContainer;

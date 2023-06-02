import { useDispatch, useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import TimelineTop from './TimelineTop';
import { useMemo } from 'react';
import { actions } from '../../store/iso.actions';
import { IShot } from '../../store/iso.types';
import { guid4 } from 'shared-base';

export type TimelineTopContainerProps = {};

export function TimelineTopContainer(_props: TimelineTopContainerProps) {
  const dispatch = useDispatch();
  const shots = useSelector(selectors.base.$shots);
  const isoState = useSelector(selectors.raw.$rawIsoState);
  const { totalDuration, focusedShotId } = isoState;

  const callbacks = useMemo(
    () => ({
      onClick: (shot: IShot) => {
        dispatch(
          actions.isoState.patch({
            shotId: shot.id,
          })
        );
      },
      onSplit: (timestamp: number) => {
        const id = guid4();

        dispatch(
          actions.shots.add({
            id,
            timestamp,
            name: 'New shot',
          })
        );
      },
      onZoomIn: (shot: IShot) => {
        dispatch(
          actions.isoState.patch({
            focusedShotId: shot.id,
          })
        );
      },
      onUnselect: () => {
        dispatch(
          actions.isoState.patch({
            shotId: undefined,
          })
        );
      },
      onUnfocus: () => {
        dispatch(
          actions.isoState.patch({
            focusedShotId: undefined,
          })
        );
      },
      onMove: (shot: IShot, timestamp: number) => {
        dispatch(
          actions.shots.patch(shot.id, {
            timestamp,
          })
        );
      },
      onDelete: (shot: IShot) => {
        dispatch(actions.shots.delete(shot.id));
      },
    }),
    []
  );

  return (
    <TimelineTop
      focusedShotId={focusedShotId}
      totalDuration={totalDuration}
      shots={shots}
      callbacks={callbacks}
    />
  );
}

export default TimelineTopContainer;

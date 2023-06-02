import { useDispatch, useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import Timeline from './Timeline';
import { useMemo } from 'react';
import { IDot } from '../../store/iso.types';

export type TimelineContainerProps = {};

export function TimelineContainer(_props: TimelineContainerProps) {
  const dispatch = useDispatch();
  const dots = useSelector(selectors.playback.$timelineForRegion);
  const timelineRegion = useSelector(selectors.playback.$timelineRegion);

  const callbacks = useMemo(
    () => ({
      onDotAdd: (timestamp: number) => {
        dispatch({
          type: 'iso/dot',
          verb: 'new',
          params: { timestamp: Math.round(timestamp) },
        });
      },
      onDotClick: (dot: IDot) => {
        dispatch({
          type: 'iso/dot',
          verb: 'click',
          params: { dot },
        });
      },
      onDotMove: (dot: IDot, percent: number) => {
        dispatch({
          type: 'iso/dot',
          verb: 'move',
          params: { dot, percent },
        });
      },
      onDotDelete: (dot: IDot) => {
        dispatch({
          type: 'iso/dot',
          verb: 'delete',
          params: { dot },
        });
      },
      onEscape: () => {
        dispatch({
          type: 'iso/dot',
          verb: 'unselect',
        });
      },
    }),
    []
  );

  return <Timeline dots={dots} region={timelineRegion} callbacks={callbacks} />;
}

export default TimelineContainer;

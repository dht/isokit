import { useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import TimelineTop from './TimelineTop';

export type TimelineTopContainerProps = {};

export function TimelineTopContainer(_props: TimelineTopContainerProps) {
  const isoState = useSelector(selectors.raw.$rawIsoState);

  return <TimelineTop totalDuration={isoState.totalDuration} />;
}

export default TimelineTopContainer;

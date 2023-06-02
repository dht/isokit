import TimeInfo from './TimeInfo';
import { useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';

export type TimeInfoContainerProps = {};

export function TimeInfoContainer(_props: TimeInfoContainerProps) {
  const isoState = useSelector(selectors.raw.$rawIsoState);

  return <TimeInfo totalDuration={isoState.totalDuration} />;
}

export default TimeInfoContainer;

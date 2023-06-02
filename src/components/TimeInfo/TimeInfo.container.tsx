import TimeInfo from './TimeInfo';
import { useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';

export type TimeInfoContainerProps = {};

export function TimeInfoContainer(_props: TimeInfoContainerProps) {
  const totalDuration = useSelector(selectors.base.$totalDuration);

  return <TimeInfo totalDuration={totalDuration} />;
}

export default TimeInfoContainer;

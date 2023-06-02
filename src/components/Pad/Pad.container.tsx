import { useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { Pad } from './Pad';

export type PadContainerProps = {};

export function PadContainer(props: PadContainerProps) {
  const isoState = useSelector(selectors.raw.$rawIsoState);
  const { meshId } = isoState;

  return <Pad meshId={meshId} />;
}

export default PadContainer;

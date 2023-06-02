import { useDispatch, useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { useSpace } from '../../hooks/useSpace';
import { actions } from '../../store/iso.actions';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { Pad } from './Pad';

export type PadContainerProps = {};

export function PadContainer(props: PadContainerProps) {
  const dispatch = useDispatch();
  const playState = useSelector(selectors.raw.$rawPlay).playbackStatus;

  const isPlaying = playState === 'playing';

  const callbacks = useMemo(() => ({}), []);

  return <Pad callbacks={callbacks} />;
}

export default PadContainer;

import { useSelector } from '@gdi/store-base';
import { useToolbar } from '../../hooks/useToolbar';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { buttons } from './Easing.data';
import Toolbar from './Toolbar';

export type EasingContainerProps = {};

export function EasingContainer(_props: EasingContainerProps) {
  const easingToggles = useSelector(selectors.base.$easingToggles);

  const callbacks = useToolbar(buttons);

  return <Toolbar buttons={buttons} uiToggles={easingToggles} onToggle={callbacks.onToggle} />;
}

export default EasingContainer;

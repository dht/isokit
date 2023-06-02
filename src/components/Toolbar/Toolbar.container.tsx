import { useSelector } from '@gdi/store-base';
import { useToolbar } from '../../hooks/useToolbar';
import { selectors } from '../../store/selectors/iso.selectors.index';
import Toolbar from './Toolbar';
import { buttons } from './Toolbar.data';

export type ToolbarContainerProps = {};

export function ToolbarContainer(_props: ToolbarContainerProps) {
  const uiToggles = useSelector(selectors.components.$uiToggles);

  const callbacks = useToolbar(buttons);

  return <Toolbar buttons={buttons} uiToggles={uiToggles} onToggle={callbacks.onToggle} />;
}

export default ToolbarContainer;

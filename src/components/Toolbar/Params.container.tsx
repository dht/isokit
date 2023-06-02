import { useSelector } from '@gdi/store-base';
import { useToolbar } from '../../hooks/useToolbar';
import { selectors } from '../../store/selectors/iso.selectors.index';
import Toolbar from './Toolbar';
import { params } from './Toolbar.data';

export type PosContainerProps = {};

export function PosContainer(_props: PosContainerProps) {
  const paramsSwitch = useSelector(selectors.components.$paramsSwitch);
  const isoState = useSelector(selectors.raw.$rawIsoState);

  const callbacks = useToolbar();

  return (
    <Toolbar
      selectedId={isoState.paramsId}
      buttons={params}
      uiToggles={paramsSwitch}
      onToggle={callbacks.onToggle}
    />
  );
}

export default PosContainer;

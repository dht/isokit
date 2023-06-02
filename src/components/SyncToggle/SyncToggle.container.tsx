import { useDispatch, useSelector } from '@gdi/store-base';
import { actions } from '../../store/iso.actions';
import { selectors } from '../../store/selectors/iso.selectors.index';
import SyncToggle from './SyncToggle';

export type SyncToggleProps = {};

export function SyncToggleContainer(_props: SyncToggleProps) {
  const dispatch = useDispatch();
  const isoState = useSelector(selectors.raw.$rawIsoState);
  const { isSyncOn } = isoState;

  function onToggle() {
    dispatch(
      actions.isoState.patch({
        isSyncOn: !isSyncOn,
      })
    );
  }

  return <SyncToggle isSyncOn={isSyncOn} onToggle={onToggle} />;
}

export default SyncToggleContainer;

import { useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { invokeEvent } from 'shared-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import SyncToggle from '../SyncToggle/SyncToggle.container';
import Controls from './Controls';
import { inputsByType } from './Controls.data';

export type ControlsContainerProps = {};

export function ControlsContainer(props: ControlsContainerProps) {
  const control = useSelector(selectors.raw.$rawControl);

  const inputs = useMemo(() => {
    return inputsByType[control.formType];
  }, [control.formType]);

  function onChange(change: Json) {
    invokeEvent('iso/controls', change);
  }

  return (
    <Controls
      inputs={inputs}
      values={control.pos}
      isDot={control.isDot}
      isSetPiece={control.isSetPiece}
      isEmpty={control.isEmpty}
      emptyMessage={control.emptyMessage}
      onChange={onChange}
    >
      <SyncToggle />
    </Controls>
  );
}

export default ControlsContainer;

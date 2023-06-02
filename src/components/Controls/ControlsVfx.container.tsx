import { useDispatch, useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { selectors } from '../../store/selectors/iso.selectors.index';
import Controls from './Controls';
import { positionInputs, urlInputs } from './Controls.data';
import { invokeEvent } from 'shared-base';

export type ControlsVfxContainerProps = {};

export function ControlsVfxContainer(props: ControlsVfxContainerProps) {
  const isoState = useSelector(selectors.raw.$rawIsoState);
  const isArc = isoState.isArc;
  const dotId = useSelector(selectors.raw.$rawIsoState).dotId;
  const dot = useSelector(selectors.base.$dotCurrent);

  const isDot = !!dotId;

  const inputs = useMemo(() => {
    return urlInputs.filter((input: Json) => {
      const isArcInput = input.mode === 'arc';
      return isArc === isArcInput || !input.mode;
    });
  }, [isArc]);

  const initialValues = useMemo(() => {
    if (!dot) {
      return {};
    }

    return dot.params;
  }, []);

  function onChange(change: Json) {
    invokeEvent('iso/controls', change);
  }

  return (
    <Controls inputs={inputs} initialValues={initialValues} isDot={isDot} onChange={onChange} />
  );
}

export default ControlsVfxContainer;

import { useDispatch, useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { selectors } from '../../store/selectors/iso.selectors.index';
import Controls from './Controls';
import { positionInputs, visibilityInputs } from './Controls.data';
import { invokeEvent } from 'shared-base';

export type ControlsVizContainerProps = {};

export function ControlsVizContainer(props: ControlsVizContainerProps) {
  const isoState = useSelector(selectors.raw.$rawIsoState);
  const isArc = isoState.isArc;
  const dotId = useSelector(selectors.raw.$rawIsoState).dotId;
  const dot = useSelector(selectors.base.$dotCurrent);

  const isDot = !!dotId;

  const inputs = useMemo(() => {
    return visibilityInputs.filter((input: Json) => {
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

export default ControlsVizContainer;

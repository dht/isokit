import { useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { invokeEvent } from 'shared-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import Controls from './Controls';
import { urlInputs } from './Controls.data';

export type ControlsSkyContainerProps = {};

export function ControlsSkyContainer(props: ControlsSkyContainerProps) {
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

    return dot;
  }, []);

  function onChange(change: Json) {
    console.log('change ->', change);
    invokeEvent('iso/controls', change);
  }

  return (
    <Controls inputs={inputs} initialValues={initialValues} isDot={isDot} onChange={onChange} />
  );
}

export default ControlsSkyContainer;

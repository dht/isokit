import { invokeEvent } from 'shared-base';
import Controls from './Controls';
import { bezierInputs } from './Controls.data';
import { useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { useMemo } from 'react';

export type ControlsBezContainerProps = {};

export function ControlsBezContainer(props: ControlsBezContainerProps) {
  const dotId = useSelector(selectors.raw.$rawIsoState).dotId;
  const dotCurrentBezier = useSelector(selectors.base.$dotCurrentBezier) ?? [];
  const isDot = !!dotId;

  function onChange(change: Json) {
    invokeEvent('iso/controls', change);
  }

  const initialValues = useMemo(() => {
    return {
      b1: dotCurrentBezier[0],
      b2: dotCurrentBezier[1],
      b3: dotCurrentBezier[2],
      b4: dotCurrentBezier[3],
    };
  }, []);

  return (
    <Controls
      inputs={bezierInputs}
      initialValues={initialValues}
      isDot={isDot}
      onChange={onChange}
      isBezier={true}
    />
  );
}

export default ControlsBezContainer;

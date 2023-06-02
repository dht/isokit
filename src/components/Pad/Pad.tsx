import { useEffect, useState } from 'react';
import { invokeEvent } from 'shared-base';
import { usePad } from './Pad.hooks';
import { Wrapper } from './Pad.style';

export type PadProps = {
  meshId: string;
};

export function Pad(props: PadProps) {
  const { meshId } = props;

  const [ref, { isDown, dx, dy, withShift, withCtrl, withAlt }] = usePad();
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const ratio = rect.width / rect.height;
    setRatio(ratio);
  });

  useEffect(() => {
    if (!isDown || !meshId) {
      return;
    }

    const dyNormalized = dy * ratio;

    invokeEvent('pad/move', {
      dx,
      dy: dyNormalized,
      withShift,
      withCtrl,
      withAlt,
    });
  }, [isDown, dx, dy, ratio, meshId]);

  useEffect(() => {
    if (!isDown || !meshId) {
      return;
    }

    invokeEvent('pad/start');
  }, [isDown, meshId]);

  return <Wrapper className='Pad-wrapper' data-testid='Pad-wrapper' ref={ref}></Wrapper>;
}

export default Pad;

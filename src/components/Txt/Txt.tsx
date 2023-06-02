import React, { useState } from 'react';
import { SmallPrint, Subtext, Text, Wrapper } from './Txt.style';
import classnames from 'classnames';
import { useCustomEvent } from '../../hooks/useCustomEvent';

export type TxtProps = {};

export function Txt(props: TxtProps) {
  const [show, setShow] = useState(false);

  const className = classnames('Txt-wrapper', {
    show,
  });

  useCustomEvent(
    'waveform/timeupdate',
    (ev: any) => {
      const { currentTime } = ev;
      setShow(currentTime > 55);
    },
    []
  );

  return (
    <Wrapper className={className} data-testid='Txt-wrapper'>
      <Text>MODELZ</Text>
      <Subtext>== Get yours today ==</Subtext>
      <SmallPrint>
        Regular maintenance and servicing of the modelz hovercraft are essential for optimal
        performance and safety. VR training on Vision Ultra is required to operate a hovercraft in
        the case of engine failure.
      </SmallPrint>
    </Wrapper>
  );
}

export default Txt;

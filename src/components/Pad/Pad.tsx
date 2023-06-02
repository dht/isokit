import React from 'react';
import { Wrapper } from './Pad.style';

export type PadProps = {
  callbacks: any;
};

export function Pad(_props: PadProps) {
  return (
    <Wrapper className='Pad-wrapper' data-testid='Pad-wrapper'>
      Pad
    </Wrapper>
  );
}

export default Pad;

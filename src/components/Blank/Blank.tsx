import React from 'react';
import { Wrapper } from './Blank.style';

export type BlankProps = {};

export function Blank(_props: BlankProps) {
    return (
        <Wrapper className="Blank-wrapper" data-testid="Blank-wrapper">
            Blank
        </Wrapper>
    );
}

export default Blank;

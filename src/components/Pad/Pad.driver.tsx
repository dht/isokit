import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Pad, PadProps } from './Pad';
import { BaseComponentDriver } from 'testing-base';

export class PadDriver extends BaseComponentDriver {
    private props: Partial<PadProps> = {};

    constructor() {
        super('Pad');
    }

    when: any = {
        rendered: () => {
            render(<Pad {...(this.props as PadProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<Pad {...(this.props as PadProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<PadProps>) => {
            this.props = props;
            return this;
        },
    };

    get = {
        WrapperClassName: () => {
            return this.wrapper.className;
        },
        label: () => {
            return this.wrapper.innerHTML;
        },
    };
}

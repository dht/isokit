import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Range, RangeProps } from './Range';
import { BaseComponentDriver } from 'testing-base';

export class RangeDriver extends BaseComponentDriver {
    private props: Partial<RangeProps> = {};

    constructor() {
        super('Range');
    }

    when: any = {
        rendered: () => {
            render(<Range {...(this.props as RangeProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<Range {...(this.props as RangeProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<RangeProps>) => {
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

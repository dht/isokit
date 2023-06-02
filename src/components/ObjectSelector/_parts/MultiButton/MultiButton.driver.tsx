import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MultiButton, MultiButtonProps } from './MultiButton';
import { BaseComponentDriver } from 'testing-base';

export class MultiButtonDriver extends BaseComponentDriver {
    private props: Partial<MultiButtonProps> = {};

    constructor() {
        super('MultiButton');
    }

    when: any = {
        rendered: () => {
            render(<MultiButton {...(this.props as MultiButtonProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<MultiButton {...(this.props as MultiButtonProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<MultiButtonProps>) => {
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

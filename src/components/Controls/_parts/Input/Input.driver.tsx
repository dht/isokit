import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input, InputProps } from './Input';
import { BaseComponentDriver } from 'testing-base';

export class InputDriver extends BaseComponentDriver {
    private props: Partial<InputProps> = {};

    constructor() {
        super('Input');
    }

    when: any = {
        rendered: () => {
            render(<Input {...(this.props as InputProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<Input {...(this.props as InputProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<InputProps>) => {
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

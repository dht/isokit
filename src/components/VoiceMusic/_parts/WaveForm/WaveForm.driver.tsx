import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { WaveForm, WaveFormProps } from './WaveForm';
import { BaseComponentDriver } from 'testing-base';

export class WaveFormDriver extends BaseComponentDriver {
    private props: Partial<WaveFormProps> = {};

    constructor() {
        super('WaveForm');
    }

    when: any = {
        rendered: () => {
            render(<WaveForm {...(this.props as WaveFormProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<WaveForm {...(this.props as WaveFormProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<WaveFormProps>) => {
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

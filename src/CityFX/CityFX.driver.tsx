import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CityFX, CityFXProps } from './CityFX';
import { BaseComponentDriver } from 'testing-base';

export class CityFXDriver extends BaseComponentDriver {
    private props: Partial<CityFXProps> = {};

    constructor() {
        super('CityFX');
    }

    when: any = {
        rendered: () => {
            render(<CityFX {...(this.props as CityFXProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<CityFX {...(this.props as CityFXProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<CityFXProps>) => {
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

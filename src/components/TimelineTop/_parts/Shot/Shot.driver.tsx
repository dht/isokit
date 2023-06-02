import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Shot, ShotProps } from './Shot';
import { BaseComponentDriver } from 'testing-base';

export class ShotDriver extends BaseComponentDriver {
    private props: Partial<ShotProps> = {};

    constructor() {
        super('Shot');
    }

    when: any = {
        rendered: () => {
            render(<Shot {...(this.props as ShotProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<Shot {...(this.props as ShotProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<ShotProps>) => {
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

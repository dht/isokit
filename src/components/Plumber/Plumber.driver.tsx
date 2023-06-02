import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Plumber, PlumberProps } from './Plumber';
import { BaseComponentDriver } from 'testing-base';

export class PlumberDriver extends BaseComponentDriver {
    private props: Partial<PlumberProps> = {};

    constructor() {
        super('Plumber');
    }

    when: any = {
        rendered: () => {
            render(<Plumber {...(this.props as PlumberProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<Plumber {...(this.props as PlumberProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<PlumberProps>) => {
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

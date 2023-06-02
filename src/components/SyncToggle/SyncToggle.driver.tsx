import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SyncToggle, SyncToggleProps } from './SyncToggle';
import { BaseComponentDriver } from 'testing-base';

export class SyncToggleDriver extends BaseComponentDriver {
    private props: Partial<SyncToggleProps> = {};

    constructor() {
        super('SyncToggle');
    }

    when: any = {
        rendered: () => {
            render(<SyncToggle {...(this.props as SyncToggleProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<SyncToggle {...(this.props as SyncToggleProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<SyncToggleProps>) => {
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

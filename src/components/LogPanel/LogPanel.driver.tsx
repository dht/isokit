import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LogPanel, LogPanelProps } from './LogPanel';
import { BaseComponentDriver } from 'testing-base';

export class LogPanelDriver extends BaseComponentDriver {
    private props: Partial<LogPanelProps> = {};

    constructor() {
        super('LogPanel');
    }

    when: any = {
        rendered: () => {
            render(<LogPanel {...(this.props as LogPanelProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<LogPanel {...(this.props as LogPanelProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<LogPanelProps>) => {
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

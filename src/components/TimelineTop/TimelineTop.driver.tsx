import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TimelineTop, TimelineTopProps } from './TimelineTop';
import { BaseComponentDriver } from 'testing-base';

export class TimelineTopDriver extends BaseComponentDriver {
    private props: Partial<TimelineTopProps> = {};

    constructor() {
        super('TimelineTop');
    }

    when: any = {
        rendered: () => {
            render(<TimelineTop {...(this.props as TimelineTopProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<TimelineTop {...(this.props as TimelineTopProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<TimelineTopProps>) => {
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

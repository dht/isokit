import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TimeInfo, TimeInfoProps } from './TimeInfo';
import { BaseComponentDriver } from 'testing-base';

export class TimeInfoDriver extends BaseComponentDriver {
    private props: Partial<TimeInfoProps> = {};

    constructor() {
        super('TimeInfo');
    }

    when: any = {
        rendered: () => {
            render(<TimeInfo {...(this.props as TimeInfoProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<TimeInfo {...(this.props as TimeInfoProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<TimeInfoProps>) => {
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

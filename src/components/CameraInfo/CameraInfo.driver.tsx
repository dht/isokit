import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CameraInfo, CameraInfoProps } from './CameraInfo';
import { BaseComponentDriver } from 'testing-base';

export class CameraInfoDriver extends BaseComponentDriver {
    private props: Partial<CameraInfoProps> = {};

    constructor() {
        super('CameraInfo');
    }

    when: any = {
        rendered: () => {
            render(<CameraInfo {...(this.props as CameraInfoProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<CameraInfo {...(this.props as CameraInfoProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<CameraInfoProps>) => {
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

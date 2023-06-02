import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PlayLine, PlayLineProps } from './PlayLine';
import { BaseComponentDriver } from 'testing-base';

export class PlayLineDriver extends BaseComponentDriver {
    private props: Partial<PlayLineProps> = {};

    constructor() {
        super('PlayLine');
    }

    when: any = {
        rendered: () => {
            render(<PlayLine {...(this.props as PlayLineProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<PlayLine {...(this.props as PlayLineProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<PlayLineProps>) => {
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

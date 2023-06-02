import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { UIPermutation, UIPermutationProps } from './UIPermutation';
import { BaseComponentDriver } from 'testing-base';

export class UIPermutationDriver extends BaseComponentDriver {
    private props: Partial<UIPermutationProps> = {};

    constructor() {
        super('UIPermutation');
    }

    when: any = {
        rendered: () => {
            render(<UIPermutation {...(this.props as UIPermutationProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<UIPermutation {...(this.props as UIPermutationProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<UIPermutationProps>) => {
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

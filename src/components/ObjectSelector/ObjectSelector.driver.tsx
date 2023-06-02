import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ObjectSelector, ObjectSelectorProps } from './ObjectSelector';
import { BaseComponentDriver } from 'testing-base';

export class ObjectSelectorDriver extends BaseComponentDriver {
    private props: Partial<ObjectSelectorProps> = {};

    constructor() {
        super('ObjectSelector');
    }

    when: any = {
        rendered: () => {
            render(<ObjectSelector {...(this.props as ObjectSelectorProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<ObjectSelector {...(this.props as ObjectSelectorProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<ObjectSelectorProps>) => {
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

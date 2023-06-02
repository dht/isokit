import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { VoiceMusic, VoiceMusicProps } from './VoiceMusic';
import { BaseComponentDriver } from 'testing-base';

export class VoiceMusicDriver extends BaseComponentDriver {
    private props: Partial<VoiceMusicProps> = {};

    constructor() {
        super('VoiceMusic');
    }

    when: any = {
        rendered: () => {
            render(<VoiceMusic {...(this.props as VoiceMusicProps)} />);
            return this;
        },
        clicked: () => {
            fireEvent.click(this.wrapper);
            return this;
        },
        snapshot: () => {
            return this.snapshot(<VoiceMusic {...(this.props as VoiceMusicProps)} />);
        },
    };

    given: any = {
        props: (props: Partial<VoiceMusicProps>) => {
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

import React, { useEffect, useState } from 'react';
import { Wrapper } from './Loader.style';

export type LoaderProps = {
    text: string;
    color: string;
    debounce?: number;
};

export function Loader(props: LoaderProps) {
    const { text, color, debounce = 0 } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(true);
        }, debounce);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    if (!show) {
        return null;
    }

    return (
        <Wrapper
            className='Loader-wrapper'
            data-testid='Loader-wrapper'
            color={color}
        >
            {text}
        </Wrapper>
    );
}

export default Loader;

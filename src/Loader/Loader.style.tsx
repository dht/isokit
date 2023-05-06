import styled from 'styled-components';

export const Wrapper = styled.div`
    color: #fff;

    text-shadow: 0 0 0.7px #fff, 0 0 1px #fff, 0 0 2.1px #fff,
        0 0 4.2px ${(props) => props.color}, 0 0 8.2px ${(props) => props.color},
        0 0 9.2px ${(props) => props.color},
        0 0 10.2px ${(props) => props.color},
        0 0 15.1px ${(props) => props.color};
    font-size: 28px;
`;

import styled from 'styled-components';

export const Wrapper = styled.div<{ width: number; height: number }>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    display: flex;
    overflow: visible;
    position: relative;

    > canvas {
        flex: 1;
        display: flex;
        width: ${(props) => props.width}px;
    }
`;

export const HudWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    pointer-events: none;
`;

export const LoaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Lines1 = styled.div<{ seconds: number }>`
  background-size: calc(100vw / ${(props) => props.seconds});
  background-image: linear-gradient(var(--grid) 0, transparent 0),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
`;

export const Lines2 = styled.div<{ seconds: number }>`
  background-size: calc(100vw / ${(props) => props.seconds / 2});
  background-image: linear-gradient(var(--grid) 0, transparent 0),
    linear-gradient(90deg, var(--grid) 1px, transparent 3px);
`;

export const Lines3 = styled.div<{ seconds: number }>`
  background-size: calc(100vw / ${(props) => props.seconds / 10});
  background-image: linear-gradient(var(--grid-color) 0, transparent 0),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 3px);
`;

export const ContentBack = styled.div`
  flex: 1;
  --background: #000;
  --grid: rgba(50, 50, 50, 0.4);
  --grid-color: #8e7e2023;
  background-color: var(--background);
  position: relative;
  left: -2px;
  border-bottom: 1px solid #334;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export const ContentFront = styled.div`
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  height: 260px;

  z-index: 2;
`;

export const HLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 5px;
  z-index: 3;
  top: 50%;
  background-image: linear-gradient(0deg, #334 0px, #000 5px);
`;

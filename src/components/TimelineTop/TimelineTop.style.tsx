import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 20px;
  --background: #112;
  --grid: rgba(255, 255, 255, 0.1);
  --grid-color: #786414a8;
  background-color: var(--background);
  position: relative;
  left: -2px;

  .lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
  }
`;

export const Lines1 = styled.div<{ seconds: number }>`
  max-height: 12px;
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

export const Line = styled.div`
  position: absolute;
  top: 0;
  left: 550px;
  width: 2px;
  height: 280px;
  z-index: 10;
  background-color: rgba(181, 238, 159, 0.315);
`;

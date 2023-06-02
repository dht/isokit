import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  position: relative;
  max-width: 355rem;
`;

export const Content = styled.div`
  position: relative;
  width: 200px;
  height: 100%;
  box-sizing: border-box;
  margin: auto;
`;

export const Handle1 = styled.div`
  width: 12rem;
  height: 12rem;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #638356;
  border-radius: 50%;
  cursor: pointer;
  z-index: 9;
`;

export const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: scaleY(-1);

  > path {
    stroke: rgba(181, 238, 159, 0.415);
    stroke-width: 2rem;
    fill: none;
  }

  rect {
    fill: rgba(181, 238, 159, 0.06);
    stroke: rgba(181, 238, 159, 0.2);
  }

  g {
    fill: transparent;
    stroke: rgba(181, 238, 159, 0.415);
    stroke-width: 2rem;
    position: relative;
    left: 40px;
    top: 10px;
  }
`;

export const Handle2 = styled(Handle1)``;

import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: -8px;
  width: 10px;
  height: 20px;
  background-color: rgba(181, 238, 159, 0.215);
  border-radius: 50%;

  &:active,
  &.selected {
    background-image: radial-gradient(circle, #ff0 0%, #ff0 50%, #f48d48 50%, #ffb5b5 100%);
    cursor: grab;
  }
`;

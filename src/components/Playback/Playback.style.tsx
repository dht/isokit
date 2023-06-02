import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 0.5;
  background-color: rgba(205, 255, 255, 0.05);
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  border: 1px solid transparent;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const Tools = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 35rem;
  bottom: 0;
`;

export const MainButton = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  user-select: none;

  > span {
    font-size: 50px;
    color: rgba(181, 238, 159, 0.315);
  }

  &:hover {
    background-color: rgba(181, 238, 159, 0.05);
  }

  &:active {
    bottom: 2px;
    right: 2px;
  }
`;

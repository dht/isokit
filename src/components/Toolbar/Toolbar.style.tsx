import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 35rem;
  background-color: #000;
`;

export const Button = styled.div`
  color: rgba(181, 238, 159, 0.315);
  width: 30rem;
  height: 30rem;
  border: 1px solid rgba(36, 48, 32, 0.7);
  cursor: pointer;
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #33443e;

    span {
      color: rgba(181, 238, 159, 0.315);
    }
  }

  &.selected {
    background-color: rgba(181, 238, 159, 0.145);

    span {
      color: rgba(181, 238, 159, 0.315);
    }
  }

  span {
    font-size: 26rem;
  }

  &.off {
    &:after {
      content: '';
      position: absolute;
      top: 1rem;
      left: 1rem;
      width: calc(28rem / 0.707);
      height: 2px;
      background-color: rgb(54, 83, 44);
      transform: rotate(45deg);
      transform-origin: left top;
    }
  }
`;

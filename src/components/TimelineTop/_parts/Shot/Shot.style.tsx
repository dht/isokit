import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  height: 12px;
  background-color: rgba(181, 238, 159, 0.065);
  border: 1px solid rgba(181, 238, 159, 0.215);
  border-right-width: 2px;
  border-left-width: 2px;

  .handle {
    display: none;
  }

  &.selected {
    background-color: rgba(181, 238, 159, 0.215);
    border: 1px solid rgba(181, 238, 159, 0.315);

    .handle {
      display: block;
    }

    &:hover {
      background-color: rgba(181, 238, 159, 0.315);
    }
  }

  &.focused {
    border: 1px solid gold;
  }

  &:last-child {
    border-right: none;
  }
`;

export const Handle = styled.div`
  width: 10px;
  height: 11px;
  border-radius: 20%;
  border: 1px solid rgba(181, 238, 159, 0.015);

  &:hover {
    border: 1px solid rgba(181, 238, 159, 0.315);
    background-color: rgba(181, 238, 159, 0.315);
  }

  &:active {
    background-color: rgba(181, 238, 159, 0.415);
  }
`;

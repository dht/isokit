import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  line-height: 30px;
  padding: 0 6px;

  &.firstCol {
    color: greenyellow;
    text-align: center;
  }

  &.loading,
  &.empty {
    text-align: center;
  }

  &.value {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

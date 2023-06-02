import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 0.77;
  background-color: rgba(205, 255, 255, 0.05);
`;

export const Item = styled.div`
  font-size: 17rem;
  color: rgba(181, 238, 159, 0.315);
  display: inline-block;
  width: calc(33% - 6rem);
  margin: 3rem;
  padding: 5rem;
  background-color: rgba(18, 23, 15, 0.315);
  border: 1px solid rgba(181, 238, 159, 0.115);
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  border-radius: 5rem;
  cursor: pointer;

  &:hover {
    background-color: #1d3518;
    border: 1px solid rgba(181, 238, 159, 0.315);
    color: #fff;
  }

  &.selected {
    background-color: #1d3518c6;
    border: 1px solid rgba(181, 238, 159, 0.315);
    color: #fff;
  }
`;

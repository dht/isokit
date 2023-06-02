import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10px;
  height: 10px;
  z-index: 1000;
  cursor: pointer;
  border-radius: 20%;
  background-color: rgba(181, 238, 159, 0.315);

  &.on {
    background-color: gold;
    box-shadow: 0 0 10px 5px #ffd900a2;
  }
  //golden halo
`;

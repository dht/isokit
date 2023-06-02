import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
`;

export const RangeRect = styled.div`
  position: absolute;
  background-color: rgba(181, 238, 159, 0.115);
  top: 0;
  bottom: 0;

  &.active {
    background-color: rgba(181, 238, 159, 0.215);
  }
`;

export const Handle = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
  width: 20px;
  height: 15px;
  background-color: rgba(181, 238, 159, 0.215);
  border-radius: 30% 0 0 30%;
  z-index: 9;

  &:hover {
    background-color: rgba(181, 238, 159, 0.415);
  }
`;

export const HandleEnd = styled(Handle)`
  border-radius: 0 30% 30% 0;
`;

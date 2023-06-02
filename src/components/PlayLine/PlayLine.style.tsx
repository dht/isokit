import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 20px;
  background-color: #000;
  border-top: 1px solid #334;
  position: relative;

  &.activeRange {
    .range {
      background-color: rgba(181, 238, 159, 0.215);
    }
  }
`;

export const Handle = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
  width: 20px;
  height: 20px;
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

export const Line = styled.div`
  position: absolute;
  top: 0;
  left: 50px;
  width: 2px;
  height: 300px;
  z-index: 9;
  background-color: #ffd9005c;
`;

export const Range = styled.div`
  position: absolute;
  background-color: rgba(181, 238, 159, 0.115);
  top: 0;
  bottom: 0;
`;

export const Elapsed = styled.div`
  font-size: 14rem;
  color: rgba(255, 255, 255, 0.2);
  padding: 3px;
  border-radius: 3px;
  background-color: #00000055;
  width: 35px;
  text-align: center;
  margin-left: 5px;
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(121, 198, 91, 0.229);
  position: absolute;
  top: 30px;
  right: 0;
  bottom: 0;
  z-index: 999;
  height: 200px;
  right: 20px;
  width: 300px;
  font-size: 15rem;
  color: rgba(121, 198, 91, 0.429);
`;

export const Content = styled.div`
  height: 200px;
  overflow-y: scroll;
  padding: 5px 8px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const Log = styled.div``;

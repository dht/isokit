import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 15px;
  background-color: #000;
  border-top: 1px solid #334;
  position: relative;
`;

export const Line = styled.div`
  position: absolute;
  top: 0;
  left: 50px;
  width: 2px;
  height: 300px;
  z-index: 9;
  background-color: #ffd9005c;
  pointer-events: none;
`;

export const Elapsed = styled.div`
  font-size: 14rem;
  color: rgba(255, 255, 255, 0.2);
  padding: 1.5px 3px;
  border-radius: 3px;
  background-color: #00000055;
  width: 35px;
  text-align: center;
  margin-left: 5px;
`;

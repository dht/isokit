import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 14rem;
  border-left: 1px solid rgba(121, 198, 91, 0.229);
`;

export const Time = styled.div`
  color: rgba(121, 198, 91, 0.429);
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
`;

export const Minutes = styled.div`
  font-size: 40rem;

  &:after {
    content: ':';
  }
`;

export const Seconds = styled.div`
  font-size: 40rem;

  &:after {
    content: '.';
  }
`;

export const Millis = styled.div`
  font-size: 20rem;
`;

export const SecondLine = styled.div`
  margin-top: 5rem;
`;

export const Percent = styled.div`
  color: rgba(121, 198, 91, 0.229);
  font-size: 20rem;
`;

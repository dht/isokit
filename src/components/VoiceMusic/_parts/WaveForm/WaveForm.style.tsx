import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid rgba(77, 105, 68, 0.5);

  .scroll {
    overflow-x: hidden !important;
  }
`;

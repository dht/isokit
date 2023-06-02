import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: 16rem;
  border: 1px solid #667;
  background-color: #fff;
  padding: 20rem 5rem;
  border-radius: 10rem;
  width: 180rem;
  text-align: center;
  position: relative;

  &.green {
    --bk-color: #0f0;
  }

  &.gold {
    --bk-color: gold;
  }

  &.palevioletred {
    --bk-color: palevioletred;
  }

  &.running {
    background-color: #fff;
    animation: blink 1.5s linear infinite alternate;

    @keyframes blink {
      0% {
        background-color: var(--bk-color);
      }

      100% {
        background-color: #fff;
      }
    }
  }
`;

export const Label = styled.div``;

export const LoaderContainer = styled.div``;

export const Gap = styled.div`
  flex: 1;
`;

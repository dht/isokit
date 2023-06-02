import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  position: absolute;
  height: 400px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  top: 900px;
  left: 10px;
  display: flex;
  overflow: hidden;

  &.perspective {
    .content {
      animation-name: slideIn;
      animation-duration: 1.2s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
      transition: opacity 1.2s ease-out;
      opacity: 1;

      @keyframes slideIn {
        from {
          transform: perspective(1000px) rotateX(15deg) scaleX(0.9) translateY(400px);
        }
        to {
          transform: perspective(1000px) rotateX(15deg) scaleX(0.9) translateY(-40px);
        }
      }
    }
  }

  @media (max-height: 1100px) {
    top: 1000px;
    zoom: 0.7;

    &.dimmer {
      .content {
        opacity: 0;
      }
    }
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: 'Monaco', sans-serif;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  height: 100px;
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  position: absolute;
  height: 400px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  top: 893px;
  left: 3px;
  max-width: calc(1600px - 6px);
  display: flex;

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

export const Data = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 950px;
  z-index: 9999;
  background-color: #223;
  overflow: auto;
  display: none;
`;

export const FullScreen = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background-color: rgba(205, 255, 255, 0.05);
  z-index: 99999;
`;

export const TogglePanel = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  width: 50px;
  height: 50px;
  background-color: rgba(205, 255, 255, 0.05);
  z-index: 99999;
`;

export const Reload = styled.div`
  position: fixed;
  top: 120px;
  right: 0;
  width: 50px;
  height: 50px;
  background-color: rgba(205, 255, 255, 0.05);
  z-index: 99999;
`;

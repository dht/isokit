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

export const Text = styled.div`
  font-size: 200rem;
  position: fixed;
  top: 100rem;
  left: 100rem;
  // green
  font-family: 'Blanka';
  color: rgba(181, 238, 159, 0.415);
  text-shadow: 0 0 10px rgba(181, 238, 159, 0.415);
  animation: glowingAnimation 5s infinite;
  letter-spacing: 10rem;
  transform: perspective(1000px) rotateX(-15deg) scaleX(0.9) translateY(-40px);

  @keyframes glowingAnimation {
    0% {
      text-shadow: 0 0 10px rgba(181, 238, 159, 0.415);
    }

    8% {
    }

    25% {
      text-shadow: 0 0 10px rgba(181, 238, 159, 0.415);
    }

    37% {
    }

    50% {
      text-shadow: 0 0 20px rgba(181, 238, 159, 0.415), 0 0 30px rgba(181, 238, 159, 0.415),
        0 0 40px rgba(181, 238, 159, 0.415), 0 0 50px rgba(181, 238, 159, 0.415),
        0 0 60px rgba(181, 238, 159, 0.415);
    }

    80% {
      text-shadow: 0 0 10px rgba(181, 238, 159, 0.415);
    }
  }
`;

export const Subtext = styled.div`
  font-size: 69rem;
  position: fixed;
  top: 340rem;
  left: 85rem;
  // green
  font-family: 'Ailerons';
  color: rgba(181, 238, 159, 0.415);
  text-shadow: 0 0 10px rgba(181, 238, 159, 0.415);
  letter-spacing: 10rem;
  width: 1000rem;
  transform: perspective(1000px) rotateX(15deg) scaleX(0.9) translateY(-40px);
  text-shadow: 0 0 20px rgba(181, 238, 159, 0.415), 0 0 30px rgba(181, 238, 159, 0.415),
    0 0 40px rgba(181, 238, 159, 0.415), 0 0 50px rgba(181, 238, 159, 0.415),
    0 0 60px rgba(181, 238, 159, 0.415);
`;

export const SmallPrint = styled.div`
  font-size: 14rem;
  position: fixed;
  top: 1000rem;
  left: 85rem;
  text-align: justify;

  font-family: 'Syncopate', sans-serif;
  color: rgba(181, 238, 159, 0.415);
  text-shadow: 0 0 10px rgba(181, 238, 159, 0.415);
  letter-spacing: 10rem;
  line-height: 1.4;
  right: 85rem;
  text-shadow: 0 0 5px rgba(181, 238, 159, 0.415), 0 0 7px rgba(181, 238, 159, 0.415),
    0 0 9px rgba(181, 238, 159, 0.415), 0 0 1px rgba(181, 238, 159, 0.415),
    0 0 13px rgba(181, 238, 159, 0.415);
`;

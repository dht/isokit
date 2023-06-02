import styled from 'styled-components';

export const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(181, 238, 159, 0.094);
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: rgba(181, 238, 159, 0.268);
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }

  input:checked + .slider {
    background-color: rgba(181, 238, 159, 0.268);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px rgba(181, 238, 159, 0.268);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 4px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

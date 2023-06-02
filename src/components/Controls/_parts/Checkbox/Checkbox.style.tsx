import styled from 'styled-components';

export const Wrapper = styled.label`
  display: block;
  position: relative;
  padding-left: 35rem;
  cursor: pointer;
  font-size: 22rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 18rem;

  &:hover input ~ .checkmark {
    background-color: rgba(181, 238, 159, 0.328);
  }

  input:checked ~ .checkmark {
    background-color: rgba(181, 238, 159, 0.368);
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: rgba(181, 238, 159, 0.168);
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 4px;
    top: 2px;
    width: 3px;
    height: 6px;
    border: solid #000;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

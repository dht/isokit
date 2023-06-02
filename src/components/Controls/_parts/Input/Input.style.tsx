import styled from 'styled-components';

export const Wrapper = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1rem solid #334;
  margin: 1rem;
  width: 110rem;
  color: rgba(181, 238, 159, 0.415);
  outline: none;
  text-align: center;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: inner-spin-button !important;
    width: 22px;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
  }

  &[type='url'] {
    width: 80%;
  }
`;

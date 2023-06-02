import styled from 'styled-components';
import { base } from '../../ObjectSelector.style';
import { menu } from '../../ObjectSelector.utils';

export const Wrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const Options = styled.div`
  position: absolute;
  bottom: -5rem;
  left: 65rem;
  width: 284rem;
  background-color: rgba(0, 0, 0, 0.95);
  padding: 5rem;
  border: 1rem solid rgba(255, 255, 255, 0.2);
  border-radius: 5rem;
`;

export const Option = styled.div``;

export const Item = styled.div`
  font-size: 17rem;
  float: left;
  width: 85rem;
  margin: 4rem;
  box-sizing: border-box;
  text-align: center;
  border-radius: 5rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${menu('layer', base.layer)}

  .title {
    padding-left: 7rem;
  }

  span {
    font-size: 22rem;
    border-left: 1rem solid rgba(255, 255, 255, 0.2);
    padding: 5rem;

    &.active {
      background-color: var(--bk-color-selected);
      color: var(--color-selected);
    }
  }
`;

import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Text = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 11px;
  padding: 2px 5px;
  color: rgba(181, 238, 159, 0.315);
  opacity: 0.3;
  line-height: 13.5px;

  &:hover {
    opacity: 1;
  }
`;

export const Index = styled(Text)`
  position: absolute;
  right: auto;
  left: 0;
`;

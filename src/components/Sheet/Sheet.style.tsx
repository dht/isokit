import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 5000px;

  --grid: rgba(0, 0, 0, 0.5);
  color: #aab;
  font-size: 11px;

  // cells
  background-image: linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 70px 30px;
  display: grid;
  grid-template-columns: repeat(14, 70px);
  grid-template-rows: repeat(1000, 30px);
`;

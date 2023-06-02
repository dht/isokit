import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  font-size: 20rem;
  color: white;
  display: flex;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 5rem;
  padding-left: 25rem;

  &.bezier {
    max-width: 355rem;
    box-sizing: border-box;
  }

  &.dot {
    background-image: linear-gradient(105deg, rgba(38, 255, 0, 0.15) 0%, rgba(0, 0, 0, 0) 100%);
    background-size: 5px;
  }
`;

export const ControlField = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  &.empty {
    opacity: 0;
    pointer-events: none;
  }

  label {
    font-size: 18rem;
    color: rgba(181, 238, 159, 0.315);
    width: 30rem;
    text-align: right;
    padding-right: 10rem;
    text-transform: uppercase;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const Value = styled.div``;

/*
s4
s5
s1
s3
s2
s10
s6
*/

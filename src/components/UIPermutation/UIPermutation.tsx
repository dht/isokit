import React from 'react';
import { Index, Text, Wrapper } from './UIPermutation.style';

export type UIPermutationProps = {
  index: number;
  arr: string[];
};

export function UIPermutation(props: UIPermutationProps) {
  const { index, arr } = props;

  function copyToClipboard() {
    const text = ['', '.', index, ...arr, 'A', '', ''].join('|');
    navigator.clipboard.writeText(text);
  }

  return (
    <Wrapper
      className='UIPermutation-wrapper'
      data-testid='UIPermutation-wrapper'
      onClick={copyToClipboard}
    >
      <Text>
        {arr.map((i, index) => (
          <div key={index}>{i}</div>
        ))}
      </Text>
      <Index>{index}</Index>
    </Wrapper>
  );
}

export default UIPermutation;

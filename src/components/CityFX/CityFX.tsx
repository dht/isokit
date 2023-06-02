import React from 'react';
import { useBoard } from '../../hooks/useBoard';
import { BabylonScene } from '../../isokit.scene';
import { board } from './CityFX.board';
import { Wrapper } from './CityFX.style';

export type CityFXProps = {
  glbPath: string;
};

export function CityFX(props: CityFXProps) {
  const { glbPath } = props;

  const isReady = useBoard(board(glbPath));

  return (
    <Wrapper className='CityFX-wrapper' data-testid='CityFX-wrapper'>
      <BabylonScene />
    </Wrapper>
  );
}

export default CityFX;

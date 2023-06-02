import Draggable, { DraggableData } from 'react-draggable';
import { IDot, IRegion } from '../../../../store/iso.types';
import { Wrapper } from './Dot.style';
import classnames from 'classnames';
import { useKey } from 'react-use';
import { useEffect, useState } from 'react';

export type DotProps = {
  dot: IDot;
  totalWidth: number;
  region: IRegion;
  callbacks: {
    onDotClick: (dot: IDot) => void;
    onDotMove: (dot: IDot, percent: number) => void;
    onDotDelete: (dot: IDot) => void;
  };
};

export function Dot(props: DotProps) {
  const { dot, region, totalWidth, callbacks } = props;
  const { timestamp, isSelected } = dot;
  const [isHover, setIsHover] = useState(true);
  const { start, duration } = region;
  const x = ((timestamp - start) / duration) * totalWidth;
  const [position, setPosition] = useState({ x, y: 0 });

  useEffect(() => {
    const x = ((timestamp - start) / duration) * totalWidth;
    setPosition({ x, y: 0 });
  }, [region]);

  useKey(
    'Delete',
    () => {
      if (!isSelected || !isHover) {
        return;
      }

      callbacks.onDotDelete(dot);
    },
    {},
    [isSelected, isHover]
  );

  function onStart(_ev: any, pos: any) {
    // console.log('pos.x ->', pos.x);
  }

  function onDrag(_ev: any, data: DraggableData) {
    setPosition({ x: data.x, y: 0 });
  }

  function onStop(_ev: any, data: DraggableData) {
    const { x } = data;
    const localPercent = x / totalWidth;
    callbacks.onDotMove(dot, localPercent);
  }

  function onClick() {
    callbacks.onDotClick(dot);
  }

  const className = classnames('Dot-wrapper', {
    selected: isSelected,
  });

  return (
    <Draggable axis='x' onStart={onStart} onDrag={onDrag} onStop={onStop} position={position}>
      <Wrapper
        onClick={onClick}
        className={className}
        data-testid='Dot-wrapper'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      />
    </Draggable>
  );
}

export default Dot;

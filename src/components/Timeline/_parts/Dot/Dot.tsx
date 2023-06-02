import Draggable from 'react-draggable';
import { IDot } from '../../../../store/iso.types';
import { Wrapper } from './Dot.style';
import classnames from 'classnames';
import { useKey } from 'react-use';

export type DotProps = {
  dot: IDot;
  width: number;
  totalDuration: number;
  callbacks: {
    onDotClick: (dot: IDot) => void;
    onDotMove: (dot: IDot, percent: number) => void;
    onDotDelete: (dot: IDot) => void;
  };
};

export function Dot(props: DotProps) {
  const { dot, width, callbacks, totalDuration } = props;
  const { timestamp, isSelected } = dot;

  useKey(
    'Delete',
    () => {
      if (!isSelected) {
        return;
      }

      callbacks.onDotDelete(dot);
    },
    {},
    [isSelected]
  );

  const x = (timestamp / (totalDuration * 1000)) * width;

  const defaultPosition = {
    x,
    y: 0,
  };

  function onStart(_ev: any, pos: any) {
    // console.log('pos.x ->', pos.x);
  }

  function onStop(_ev: any, pos: any) {
    callbacks.onDotMove(dot, pos.x / width);
  }

  function onClick() {
    callbacks.onDotClick(dot);
  }

  const className = classnames('Dot-wrapper', {
    selected: isSelected,
  });

  return (
    <Draggable axis='x' onStart={onStart} onStop={onStop} defaultPosition={defaultPosition}>
      <Wrapper onClick={onClick} className={className} data-testid='Dot-wrapper' />
    </Draggable>
  );
}

export default Dot;

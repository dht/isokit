import React, { useState } from 'react';
import { Content, Handle1, Handle2, Svg, Wrapper } from './Bezier.style';
import Draggable from 'react-draggable';
import {
  cubicBezierArrayToSvg,
  handle1Path,
  handle1Position,
  handle2Path,
  handle2Position,
} from './Bezier.utils';
import { useMeasure } from 'react-use';

export type BezierProps = {
  value?: number[];
  callbacks: any;
};

export function Bezier(props: BezierProps) {
  const { value = [0.25, 0.75, 0.75, 0.25] } = props;
  const [currentValue, setCurrentValue] = useState(value);

  function renderMainPath() {
    const d = cubicBezierArrayToSvg(currentValue, 120, 80);
    return <path d={d} />;
  }

  const defaultPosition1 = handle1Position(currentValue, 120, 80);
  const defaultPosition2 = handle2Position(currentValue, 120, 80);

  const onDrag = (index: number) => (_ev: any, val: any) => {
    const newValue = [...currentValue];
    const px = (val.x - 40) / 120;
    const py = (val.y - 10) / 80;

    newValue[index * 2] = px;
    newValue[index * 2 + 1] = 1 - py;

    setCurrentValue(newValue);
  };

  function onStop() {
    props.callbacks.onChange(currentValue);
  }

  return (
    <Wrapper className='Bezier-wrapper' data-testid='Bezier-wrapper'>
      <Content>
        <Draggable defaultPosition={defaultPosition1} onDrag={onDrag(0)} onStop={onStop}>
          <Handle1 />
        </Draggable>
        <Draggable defaultPosition={defaultPosition2} onDrag={onDrag(1)} onStop={onStop}>
          <Handle2 />
        </Draggable>
        <Svg width='100%' height='100%'>
          <rect x='40' y='10' width={120} height={80} />
          <g transform='translate(40 10)'>
            {renderMainPath()}
            <path d={handle1Path(currentValue, 120, 80)} />
            <path d={handle2Path(currentValue, 120, 80)} />
          </g>
        </Svg>
      </Content>
    </Wrapper>
  );
}

export default Bezier;

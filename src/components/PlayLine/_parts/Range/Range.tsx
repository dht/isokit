import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { invokeEvent } from 'shared-base';
import { Handle, HandleEnd, RangeRect, Wrapper } from './Range.style';

export type RangeProps = {
  width: number;
  range: number[];
  isRangeActive: boolean;
  callbacks: {
    onMove: (index: number, newValue: number) => void;
    onContextMenu: (value: boolean) => void;
  };
};

export function Range(props: RangeProps) {
  const { width, isRangeActive, callbacks, range: r } = props;
  const [showRange, setShowRange] = useState(true);
  const [range, setRange] = useState(r);

  const [percent1, percent2] = r;

  const [position1, setPosition1] = useState({
    x: percent1 * width,
    y: 0,
  });
  const [position2, setPosition2] = useState({
    x: percent2 * width - 18,
    y: 0,
  });

  useEffect(() => {
    setRange(r);
    const [x, y] = r;
    setPosition1({
      x: x * width,
      y: 0,
    });
    setPosition2({
      x: y * width - 18,
      y: 0,
    });
  }, [r]);

  const onContextMenu = useCallback(
    (ev: React.MouseEvent) => {
      //right-click
      ev.preventDefault();
      callbacks.onContextMenu(!isRangeActive);
      return false;
    },
    [isRangeActive]
  );

  const onStart = (index: number) => (_ev: any, pos: any) => {
    setShowRange(false);
  };

  const onDrag = (index: number) => (_ev: any, pos: any) => {
    const { x } = pos;
  };

  const onStop = (index: number) => (_ev: any, pos: any) => {
    let { x } = pos;

    setShowRange(true);

    let widthLocal = width;

    if (index === 1) {
      x = x + 18;
    }

    let value = x / widthLocal;

    if (Math.abs(value - 0) < 0.02) {
      value = 0;
    } else if (Math.abs(1 - value) < 0.02) {
      value = 1;
    }

    invokeEvent('waveform/seek', { id: 'music', currentTime: value });
    invokeEvent('waveform/seek', { id: 'voice', currentTime: value });
    callbacks.onMove(index, value);
  };

  function onRangeClick(ev: any) {
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (!isAndroid) {
      return;
    }
    onContextMenu(ev);
  }

  const styleRange = {
    left: `calc(${range[0] * 100}% + 20px)`,
    width: `calc(${(range[1] - range[0]) * 100}% + -38px)`,
  };

  const className = classnames('range', {
    active: isRangeActive,
  });

  return (
    <Wrapper className='Range-wrapper' data-testid='Range-wrapper'>
      <Draggable
        axis='x'
        onStart={onStart(0)}
        onDrag={onDrag(1)}
        onStop={onStop(0)}
        position={position1}
      >
        <Handle />
      </Draggable>
      <Draggable
        axis='x'
        onStart={onStart(1)}
        onDrag={onDrag(1)}
        onStop={onStop(1)}
        position={position2}
      >
        <HandleEnd />
      </Draggable>
      {showRange && (
        <RangeRect
          className={className}
          style={styleRange}
          onContextMenu={onContextMenu}
          onClick={onRangeClick}
        />
      )}
    </Wrapper>
  );
}

export default Range;

import classnames from 'classnames';
import { useCallback, useState } from 'react';
import Draggable from 'react-draggable';
import { useMeasure } from 'react-use';
import { invokeEvent } from 'shared-base';
import { useCustomEvent } from '../../hooks/useCustomEvent';
import { LogPanelContainer } from '../LogPanel/LogPanel.container';
import { Elapsed, Handle, HandleEnd, Line, Range, Wrapper } from './PlayLine.style';

export type PlayLineProps = {
  range: number[];
  totalDuration: number;
  isRangeActive: boolean;
  callbacks: {
    onMove: (index: number, newValue: number) => void;
    onRange: (value: boolean) => void;
  };
};

export function PlayLine(props: PlayLineProps) {
  const { isRangeActive, range = [0, 1], callbacks, totalDuration = 60 } = props;
  const [ref, { width: absoluteWidth }] = useMeasure<HTMLDivElement>();
  const [percent, setPercent] = useState(0);
  const [showRange, setShowRange] = useState(true);

  let width = absoluteWidth;

  const onRange = useCallback(
    (ev: React.MouseEvent) => {
      //right-click
      ev.preventDefault();
      callbacks.onRange(!isRangeActive);
      return false;
    },
    [isRangeActive]
  );

  useCustomEvent(
    'waveform/timeupdate',
    (ev: any) => {
      const { currentTime } = ev;
      setPercent((currentTime / totalDuration) * 100);
    },
    [totalDuration]
  );

  function onClick(ev: any) {
    const { x } = ev.nativeEvent;
    invokeEvent('waveform/seek', { id: 'music', currentTime: x / width });
    invokeEvent('waveform/seek', { id: 'voice', currentTime: x / width });
  }

  const onStart = (index: number) => (_ev: any, pos: any) => {
    setShowRange(false);
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

  if (!width) {
    return <Wrapper className='PlayLine-wrapper' data-testid='PlayLine-wrapper' ref={ref} />;
  }

  function renderRange() {
    if (!showRange) {
      return;
    }

    const styleRange = {
      left: `calc(${range[0] * 100}% + 20px)`,
      width: `calc(${(range[1] - range[0]) * 100}% + -38px)`,
    };

    return <Range className='range' style={styleRange} onContextMenu={onRange} />;
  }

  const style = {
    left: `${percent}%`,
  };

  const elapsed = ((percent * totalDuration) / 100).toFixed(2);

  const defaultPosition1 = {
    x: range[0] * width,
    y: 0,
  };

  const defaultPosition2 = {
    x: range[1] * width - 18,
    y: 0,
  };

  function onContextMenu(ev: any) {
    ev.preventDefault();
  }

  const className = classnames('PlayLine-wrapper', {
    activeRange: isRangeActive,
  });

  return (
    <Wrapper
      className={className}
      data-testid='PlayLine-wrapper'
      ref={ref}
      onMouseDown={onClick}
      onContextMenu={onContextMenu}
    >
      <Line style={style}>
        <Elapsed>{elapsed}</Elapsed>
      </Line>
      <Draggable
        axis='x'
        onStart={onStart(0)}
        onStop={onStop(0)}
        defaultPosition={defaultPosition1}
      >
        <Handle />
      </Draggable>
      <Draggable
        axis='x'
        onStart={onStart(1)}
        onStop={onStop(1)}
        defaultPosition={defaultPosition2}
      >
        <HandleEnd />
      </Draggable>
      {renderRange()}
      <LogPanelContainer />
    </Wrapper>
  );
}

export default PlayLine;

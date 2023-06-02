import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useMeasure } from 'react-use';
import { invokeEvent } from 'shared-base';
import { useCustomEvent } from '../../hooks/useCustomEvent';
import { Elapsed, Line, Wrapper } from './PlayLine.style';
import Range from './_parts/Range/Range';

export type PlayLineProps = {
  range: number[];
  totalDuration: number;
  isRangeActive: boolean;
  callbacks: {
    onMove: (index: number, newValue: number) => void;
    onContextMenu: (value: boolean) => void;
  };
};

export function PlayLine(props: PlayLineProps) {
  const { isRangeActive, callbacks, totalDuration = 60 } = props;
  const [ref, { width: absoluteWidth }] = useMeasure<HTMLDivElement>();
  const [percent, setPercent] = useState(0);

  let width = absoluteWidth;

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

  if (!width) {
    return <Wrapper className='PlayLine-wrapper' data-testid='PlayLine-wrapper' ref={ref} />;
  }

  const style = {
    left: `${percent}%`,
  };

  const elapsed = ((percent * totalDuration) / 100).toFixed(2);

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
      <Range
        range={props.range}
        width={width}
        isRangeActive={isRangeActive}
        callbacks={callbacks}
      />
    </Wrapper>
  );
}

export default PlayLine;

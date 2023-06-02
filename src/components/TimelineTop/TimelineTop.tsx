import { useState } from 'react';
import { useMeasure } from 'react-use';
import { Line, Lines1, Lines2, Lines3, Wrapper } from './TimelineTop.style';

export type TimelineTopProps = {
  totalDuration: number;
};

export function TimelineTop(props: TimelineTopProps) {
  const { totalDuration } = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [percent, setPercent] = useState(50);

  function onClick(ev: any) {
    const { x } = ev.nativeEvent;
    setPercent((x / width) * 100);
  }

  function onContextMenu(ev: any) {
    ev.preventDefault();
  }

  const style = {
    left: `${percent}%`,
  };

  return (
    <Wrapper
      className='TimelineTop-wrapper'
      data-testid='TimelineTop-wrapper'
      onMouseDown={onClick}
      onContextMenu={onContextMenu}
      ref={ref}
    >
      <Lines1 className='lines' seconds={totalDuration} />
      <Lines2 className='lines' seconds={totalDuration} />
      <Lines3 className='lines' seconds={totalDuration} />
      <Line style={style} />
    </Wrapper>
  );
}

export default TimelineTop;

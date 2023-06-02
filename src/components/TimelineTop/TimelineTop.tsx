import classnames from 'classnames';
import { useState } from 'react';
import { useKey, useMeasure } from 'react-use';
import { IShot } from '../../store/iso.types';
import { Line, Lines1, Lines2, Lines3, Shots, Wrapper } from './TimelineTop.style';
import Shot from './_parts/Shot/Shot';

export type TimelineTopProps = {
  shots: IShot[];
  totalDuration: number;
  focusedShotId?: string;
  callbacks: {
    onClick: (shot: IShot) => void;
    onSplit: (timestamp: number) => void;
    onZoomIn: (shot: IShot) => void;
    onUnselect: () => void;
    onUnfocus: () => void;
    onMove: (shot: IShot, timestamp: number) => void;
    onDelete: (shot: IShot) => void;
  };
};

export function TimelineTop(props: TimelineTopProps) {
  const { shots, focusedShotId, totalDuration, callbacks } = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [percent, setPercent] = useState(50);

  function onClick(ev: any) {
    const { x } = ev.nativeEvent;
    setPercent((x / width) * 100);
  }

  function onSplit() {
    const timestamp = (percent / 100) * totalDuration * 1000;
    callbacks.onSplit(timestamp);
  }

  function onContextMenu(ev: any) {
    ev.preventDefault();
  }

  useKey('T', () => { onSplit() }, {}, [percent]); // prettier-ignore

  function renderShot(shot: IShot) {
    return (
      <Shot
        key={shot.id}
        shot={shot}
        totalDuration={totalDuration}
        totalWidth={width}
        onClick={callbacks.onClick}
        onDoubleClick={callbacks.onZoomIn}
        onUnselect={callbacks.onUnselect}
        onUnfocus={callbacks.onUnfocus}
        onMove={callbacks.onMove}
        onDelete={callbacks.onDelete}
      />
    );
  }

  function renderShots() {
    return shots.map((shot: IShot) => renderShot(shot));
  }

  const style = {
    left: `${percent}%`,
  };

  const className = classnames('TimelineTop-wrapper', {});

  return (
    <Wrapper
      className={className}
      data-testid='TimelineTop-wrapper'
      onMouseDown={onClick}
      onContextMenu={onContextMenu}
      ref={ref}
    >
      <Lines1 className='lines' seconds={totalDuration} />
      <Lines2 className='lines' seconds={totalDuration} />
      <Lines3 className='lines' seconds={totalDuration} />
      <Line style={style} />
      <Shots className='shots'>{renderShots()}</Shots>
    </Wrapper>
  );
}

export default TimelineTop;

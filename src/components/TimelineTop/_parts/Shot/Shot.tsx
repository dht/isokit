import classnames from 'classnames';
import { IShot } from '../../../../store/iso.types';
import { Handle, Wrapper } from './Shot.style';
import Draggable, { DraggableData } from 'react-draggable';
import { useKey, useMeasure } from 'react-use';
import { useState } from 'react';

export type ShotProps = {
  shot: IShot;
  totalDuration: number;
  totalWidth: number;
  onClick: (shot: IShot) => void;
  onDoubleClick: (shot: IShot) => void;
  onUnselect: () => void;
  onUnfocus: () => void;
  onMove: (shot: IShot, timestamp: number) => void;
  onDelete: (shot: IShot) => void;
};

export function Shot(props: ShotProps) {
  const { shot, totalDuration, totalWidth } = props;
  const { timestamp, duration, isSelected, isFocused } = shot;
  const [handlePosition, setHandlePosition] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(true);

  const startPercent = (timestamp / (totalDuration * 1000)) * 100;
  const widthPercent = (duration / (totalDuration * 1000)) * 100;

  const style = {
    width: `${widthPercent}%`,
    left: `${startPercent}%`,
  };

  useKey(
    'Delete',
    () => {
      if (!isSelected || !isHover) {
        return;
      }

      props.onDelete(shot);
    },
    {},
    [isSelected, isHover]
  );

  const className = classnames('shot', {
    selected: isSelected,
    focused: isFocused,
  });

  function onClick(_ev: any) {
    props.onClick(shot);
  }

  function onDoubleClick(ev: any) {
    ev.stopPropagation();
    props.onDoubleClick(shot);
  }

  function handleDrag(ev: any, ui: DraggableData) {
    setHandlePosition({ x: ui.x, y: 0 });
  }

  function onContextMenu(ev: any) {
    ev.preventDefault();

    if (isFocused) {
      props.onUnfocus();
      return;
    }

    if (isSelected) {
      props.onUnselect();
    }
  }

  function onStop(_ev: any, data: DraggableData) {
    const millisPerPixel = (1000 * totalDuration) / totalWidth;
    const timestampDelta = data.x * millisPerPixel;
    const newTimestamp = timestamp + timestampDelta;
    props.onMove(shot, newTimestamp);
    setHandlePosition({ x: 0, y: 0 });
  }

  return (
    <Wrapper
      style={style}
      className={className}
      data-testid='Shot-wrapper'
      onMouseDown={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Draggable
        handle='.handle'
        axis='x'
        position={handlePosition}
        onStop={onStop}
        onDrag={handleDrag}
      >
        <Handle className='handle' />
      </Draggable>
    </Wrapper>
  );
}

export default Shot;

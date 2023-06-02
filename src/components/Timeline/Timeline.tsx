import { useRef } from 'react';
import { useKey, useMeasure } from 'react-use';
import { IDot } from '../../store/iso.types';
import TimelineTop from '../TimelineTop/TimelineTop.container';
import VoiceMusic from '../VoiceMusic/VoiceMusic.container';
import {
  ContentBack,
  ContentFront,
  HLine,
  Lines1,
  Lines2,
  Lines3,
  Wrapper,
} from './Timeline.style';
import Dot from './_parts/Dot/Dot';

export type TimelineProps = {
  totalDuration: number;
  dots: IDot[];
  callbacks: {
    onDotAdd: (timestamp: number) => void;
    onDotClick: (dot: IDot) => void;
    onDotMove: (dot: IDot, percent: number) => void;
    onDotDelete: (dot: IDot) => void;
    onEscape: () => void;
  };
};

export function Timeline(props: TimelineProps) {
  const { dots, totalDuration, callbacks } = props;
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const refTimeline = useRef<HTMLDivElement>(null);

  useKey(
    'Escape',
    () => {
      callbacks.onEscape();
    },
    {},
    []
  );

  function onDoubleClick(ev: any) {
    const { x } = ev.nativeEvent;
    const boundingBox = refTimeline.current?.getBoundingClientRect();
    const { left = 0 } = boundingBox ?? {};
    const percent = (x - left) / width;
    const timestamp = percent * totalDuration * 1000;
    callbacks.onDotAdd(timestamp);
  }

  function renderDot(dot: IDot) {
    return (
      <Dot
        key={dot.id}
        dot={dot}
        width={width}
        totalDuration={totalDuration}
        callbacks={callbacks}
      />
    );
  }

  function renderDots() {
    return dots.map((dot: IDot) => renderDot(dot));
  }

  if (!width) {
    return <Wrapper className='Timeline-wrapper' data-testid='Timeline-wrapper' ref={ref} />;
  }

  return (
    <Wrapper
      className='Timeline-wrapper'
      data-testid='Timeline-wrapper'
      ref={ref}
      onDoubleClick={onDoubleClick}
    >
      <TimelineTop />
      <ContentBack>
        <Lines1 className='lines' seconds={totalDuration} />
        <Lines2 className='lines' seconds={totalDuration} />
        <Lines3 className='lines' seconds={totalDuration} />
        <VoiceMusic />
      </ContentBack>
      <ContentFront ref={refTimeline}>
        <HLine>{renderDots()}</HLine>
      </ContentFront>
    </Wrapper>
  );
}

export default Timeline;

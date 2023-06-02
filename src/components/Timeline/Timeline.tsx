import { useRef } from 'react';
import { useKey, useMeasure } from 'react-use';
import { IDot, IRegion } from '../../store/iso.types';
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
  dots: IDot[];
  region: IRegion;
  callbacks: {
    onDotAdd: (timestamp: number) => void;
    onDotClick: (dot: IDot) => void;
    onDotMove: (dot: IDot, percent: number) => void;
    onDotDelete: (dot: IDot) => void;
    onEscape: () => void;
  };
};

export function Timeline(props: TimelineProps) {
  const { dots, region, callbacks } = props;
  const { start, duration } = region;

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
    const timestamp = start + percent * duration;
    callbacks.onDotAdd(timestamp);
  }

  function renderDot(dot: IDot) {
    return <Dot key={dot.id} dot={dot} totalWidth={width} region={region} callbacks={callbacks} />;
  }

  function renderDots() {
    return dots.map((dot: IDot) => renderDot(dot));
  }

  if (!width) {
    return <Wrapper className='Timeline-wrapper' data-testid='Timeline-wrapper' ref={ref} />;
  }

  return (
    <Wrapper className='Timeline-wrapper' data-testid='Timeline-wrapper' ref={ref}>
      <TimelineTop />
      <ContentBack>
        <Lines1 className='lines' seconds={duration / 1000} />
        <Lines2 className='lines' seconds={duration / 1000} />
        <Lines3 className='lines' seconds={duration / 1000} />
        <VoiceMusic />
      </ContentBack>
      <ContentFront ref={refTimeline}>
        <HLine onDoubleClick={onDoubleClick}>{renderDots()}</HLine>
      </ContentFront>
    </Wrapper>
  );
}

export default Timeline;

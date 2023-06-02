import React, { useState } from 'react';
import { Millis, Minutes, Percent, SecondLine, Seconds, Time, Wrapper } from './TimeInfo.style';
import { useCustomEvent } from '../../hooks/useCustomEvent';
import { toElapsed } from './TimeInfo.utils';

export type TimeInfoProps = {
  totalDuration: number;
};

export function TimeInfo(props: TimeInfoProps) {
  const { totalDuration } = props;
  const [currentTime, setCurrentTime] = useState(0);

  useCustomEvent(
    'waveform/timeupdate',
    (ev: any) => {
      setCurrentTime(ev.currentTime);
    },
    []
  );

  const elapsed = toElapsed(currentTime);
  const percent = Math.round((currentTime / totalDuration) * 100);

  return (
    <Wrapper className='TimeInfo-wrapper' data-testid='TimeInfo-wrapper'>
      <Time>
        <Minutes>{elapsed.minutes}</Minutes>
        <Seconds>{elapsed.seconds}</Seconds>
        <Millis>{elapsed.millis}</Millis>
      </Time>
      <SecondLine>
        <Percent>|======== {percent}% ========|</Percent>
      </SecondLine>
    </Wrapper>
  );
}

export default TimeInfo;

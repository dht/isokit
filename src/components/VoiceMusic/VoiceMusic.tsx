import { useMeasure, useMount } from 'react-use';
import { WaveMode } from '../../store/iso.types';
import WaveForm from './_parts/WaveForm/WaveForm';
import { Wrapper } from './VoiceMusic.style';
import { useEffect } from 'react';

export type VoiceMusicProps = {
  musicUrl: string;
  voiceUrl: string;
  waveMode: WaveMode;
  callbacks: {
    onReady: (id: string, wavesurfer: any, duration: number) => void;
    onMount: (width: number) => void;
  };
};

const map: Record<WaveMode, number> = {
  [WaveMode.Full]: 1,
  [WaveMode.Faded]: 0.3,
  [WaveMode.None]: 0,
};

export function VoiceMusic(props: VoiceMusicProps) {
  const { musicUrl, voiceUrl, waveMode, callbacks } = props;
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const style = {
    opacity: map[waveMode],
  };

  useEffect(() => {
    if (!width) {
      return;
    }

    callbacks.onMount(width);
  }, [width]);

  return (
    <Wrapper
      className='VoiceMusic-wrapper'
      data-testid='VoiceMusic-wrapper'
      style={style}
      ref={ref}
    >
      <WaveForm
        id='music'
        height={100}
        waveColor='rgba(181, 238, 159, 0.315)'
        progressColor='rgba(0, 0, 0, 0.871)'
        url={musicUrl}
        onReady={callbacks.onReady}
      />
      <WaveForm
        id='voice'
        height={100}
        waveColor='rgba(181, 238, 159, 0.315)'
        progressColor='rgba(0, 0, 0, 0.871)'
        url={voiceUrl}
        onReady={callbacks.onReady}
      />
    </Wrapper>
  );
}

export default VoiceMusic;

import { useEffect, useRef, useState } from 'react';
import { WaveSurfer } from 'wavesurfer.js';
import { Wrapper } from './WaveForm.style';

export type WaveFormProps = {
  id: string;
  height: number;
  waveColor: string;
  progressColor: string;
  url: string;
  withTimeline?: boolean;
  onReady: (id: string, wavesurfer: WaveSurfer, duration: number) => void;
};

export function WaveForm(props: WaveFormProps) {
  const { id } = props;
  const containerRef = useRef();
  const wavesurfer = useWavesurfer(containerRef, props);

  useEffect(() => {
    if (!wavesurfer) return;

    const unlisten = wavesurfer.on('ready', () => {
      props.onReady(id, wavesurfer, wavesurfer.getDuration());
    });

    return () => unlisten();
  }, [wavesurfer]);

  return (
    <Wrapper
      ref={containerRef as any}
      className='WaveForm-wrapper'
      data-testid='WaveForm-wrapper'
    ></Wrapper>
  );
}

const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>();

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [containerRef]);

  return wavesurfer;
};

export default WaveForm;

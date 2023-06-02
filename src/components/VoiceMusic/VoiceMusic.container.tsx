import { useMemo } from 'react';
import { invokeEvent } from 'shared-base';
import { useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import VoiceMusic from './VoiceMusic';

export type VoiceMusicContainerProps = {};

export function VoiceMusicContainer(props: VoiceMusicContainerProps) {
  const isoState = useSelector(selectors.raw.$rawIsoState);
  const { isDataReady, musicUrl, voiceUrl } = isoState;

  const callbacks = useMemo(
    () => ({
      onReady: (id: string, wavesurfer: any, duration: number) => {
        invokeEvent('waveform/ready', { id, wavesurfer, duration });
      },
    }),
    []
  );

  if (!isDataReady) {
    return null;
  }

  return (
    <VoiceMusic
      musicUrl={musicUrl}
      voiceUrl={voiceUrl}
      waveMode={isoState.waveMode}
      callbacks={callbacks}
    />
  );
}

export default VoiceMusicContainer;

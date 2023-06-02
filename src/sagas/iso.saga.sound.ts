import { put, select } from 'saga-ts';
import { invokeEvent } from 'shared-base';
import { scene } from '../isokit.globals';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { clearPlayed } from './iso.saga.playback';
import { muteWaveform, seekWaveform, setWaveform } from './utils/audio';
import { log } from './helpers/log';

export function* waveformReady(action: any) {
  log('waveformReady', action);

  const { data } = action;
  const { id, wavesurfer, duration } = data;

  setWaveform(id, wavesurfer);

  if (id === 'music') {
    wavesurfer.on('timeupdate', (currentTime: number) => {
      invokeEvent('waveform/timeupdate', { currentTime });
    });
    yield put(actions.isoState.patch({ isMusicReady: true, totalDuration: duration }));
  } else if (id === 'voice') {
    yield put(actions.isoState.patch({ isVoiceReady: true }));
  }

  const isoState = yield* select(selectors.raw.$rawIsoState);

  if (isoState.isMusicReady && isoState.isVoiceReady) {
    yield put(actions.isoState.patch({ isAudioReady: true }));
  }
}

export function* waveformSeek(action: any) {
  log('waveformSeek', action);

  const { data } = action;
  const { id, currentTime } = data;

  clearPlayed();
  seekWaveform(id, currentTime);
  scene.stopAllAnimations();
}

export function* onMuteChange(action: any) {
  log('onMuteChange', action);

  const { payload } = action;
  const { isVolumeOn } = payload;

  muteWaveform('music', !isVolumeOn);
  muteWaveform('voice', !isVolumeOn);
}

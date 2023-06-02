import { call, put, select } from 'saga-ts';
import { delay, invokeEvent } from 'shared-base';
import { scene } from '../isokit.globals';
import { actions } from '../store/iso.actions';
import { selectors } from '../store/selectors/iso.selectors.index';
import { log } from './helpers/log';
import { clearPlayed } from './iso.saga.frame';
import { muteWaveform, playSfx, seekWaveform, setWaveform } from './utils/audio';
import { frameAll } from './iso.saga.frame';

export function* waveformReady(action: any) {
  const { data } = action;
  const { id, wavesurfer, duration } = data;
  log(`waveformReady (${id})`, action);

  setWaveform(id, wavesurfer);

  if (id === 'music') {
    wavesurfer.on('timeupdate', (currentTime: number) => {
      invokeEvent('waveform/timeupdate', { currentTime });
    });
    yield put(actions.isoState.patch({ isMusicReady: true, totalDuration: duration }));
    log('musicReady');
  } else if (id === 'voice') {
    yield put(actions.isoState.patch({ isVoiceReady: true }));
    log('voiceReady');
  }

  const isoState = yield* select(selectors.raw.$rawIsoState);

  if (isoState.isMusicReady && isoState.isVoiceReady) {
    yield delay(0);
    yield put(actions.isoState.patch({ isAudioReady: true }));
    log('audioReady');
  }
}

export function* waveformSeek(action: any) {
  const { data } = action;
  const { id, currentTime } = data;

  yield call(clearPlayed);

  seekWaveform(id, currentTime);

  if (id === 'music') {
    yield call(frameAll, currentTime);
  }
}

export function* playSfxDot(dot: IDot) {
  const { id, url, params } = dot;
  playSfx(id, url, params);
}

export function* onMuteChange(action: any) {
  const { payload } = action;
  const { isVolumeOn } = payload;

  muteWaveform('music', !isVolumeOn);
  muteWaveform('voice', !isVolumeOn);
}

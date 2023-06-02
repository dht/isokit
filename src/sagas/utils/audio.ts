const audioPlayers: Record<string, HTMLAudioElement> = {};
const waveforms: Record<string, any> = {};
const sfx: Record<string, any> = {};

export const loadAudioFile = (name: string, audioUrl: string) => {
  return new Promise((resolve) => {
    const audio = new Audio(audioUrl);

    audioPlayers[name] = audio;

    audio.addEventListener('canplaythrough', () => {
      resolve(true);
    });
  });
};

export const loadAudioFiles = (files: Json) => {
  return Promise.all(
    Object.keys(files).map((name) => {
      const audioUrl = files[name];
      return loadAudioFile(name, audioUrl);
    })
  );
};

export const playSfx = (id: string, audioUrl: string, params?: Json) => {
  const { volume = 1 } = params || {};

  sfx[id] = new Audio(audioUrl);
  sfx[id].loop = false;
  sfx[id].volume = volume;
  sfx[id].play();
};

export const play = (name: string) => {
  if (audioPlayers[name]) {
    audioPlayers[name].play();
  }
};

export const stop = (name: string) => {
  if (audioPlayers[name]) {
    audioPlayers[name].pause();
  }
};

export const setWaveform = (id: string, wavesurfer: any) => {
  waveforms[id] = wavesurfer;
};

export const playWaveform = (id: string, startAt?: number, options: any = {}) => {
  const { volume = 1 } = options;

  if (!waveforms[id]) {
    return;
  }

  if (!waveforms[id].isPlaying()) {
    waveforms[id].playPause();
    waveforms[id].setVolume(volume);
  }

  if (startAt !== undefined) {
    waveforms[id].seekTo(startAt);
  }
};

export const pauseWaveform = (id: string) => {
  if (!waveforms[id]) {
    return;
  }

  waveforms[id].pause();
};

// percent: 0.0 - 1.0
export const seekWaveform = (id: string, percent: number) => {
  if (!waveforms[id]) {
    return;
  }

  waveforms[id].seekTo(percent);
};

export const muteWaveform = (id: string, mute?: boolean) => {
  if (!waveforms[id]) {
    return;
  }

  if (mute) {
    waveforms[id].setVolume(0);
  } else {
    waveforms[id].setVolume(1);
  }
};

export const getWaveformPosition = (id: string) => {
  if (!waveforms[id]) {
    return null;
  }

  console.log('waveforms[id] ->', waveforms[id]);

  return waveforms[id].getCurrentTime();
};

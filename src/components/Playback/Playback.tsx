import { MainButton, Wrapper } from './Playback.style';

export type PlaybackProps = {
  isPlaying: boolean;
  callbacks: {
    onPlay: (play: boolean) => void;
  };
};

export function Playback(props: PlaybackProps) {
  const { isPlaying, callbacks } = props;
  const iconName = isPlaying ? 'pause' : 'play_arrow';

  function onClick() {
    callbacks.onPlay(!isPlaying);
  }

  return (
    <Wrapper className='Playback-wrapper' data-testid='Playback-wrapper' title='Space'>
      <MainButton onClick={onClick}>
        <span className='material-symbols-outlined'>{iconName}</span>
      </MainButton>
    </Wrapper>
  );
}

export default Playback;

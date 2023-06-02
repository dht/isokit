import { MainButton, Wrapper } from './Playback.style';
import classnames from 'classnames';

export type PlaybackProps = {
  children?: React.ReactNode;
  isPlaying: boolean;
  isDisabled: boolean;
  callbacks: {
    onPlay: (play: boolean) => void;
  };
};

export function Playback(props: PlaybackProps) {
  const { isPlaying, isDisabled, callbacks } = props;
  const iconName = isPlaying ? 'pause' : 'play_arrow';

  function onClick() {
    callbacks.onPlay(!isPlaying);
  }

  const className = classnames('Playback-wrapper', {
    disabled: isDisabled,
  });

  return (
    <Wrapper className={className} data-testid='Playback-wrapper' title='Space'>
      <MainButton onClick={onClick}>
        <span className='material-symbols-outlined'>{iconName}</span>
      </MainButton>
      {props.children}
    </Wrapper>
  );
}

export default Playback;

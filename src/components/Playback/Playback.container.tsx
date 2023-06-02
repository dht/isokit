import { useDispatch, useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { useSpace } from '../../hooks/useSpace';
import { actions } from '../../store/iso.actions';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { Playback } from './Playback';

export type PlaybackContainerProps = {
  children?: React.ReactNode;
};

export function PlaybackContainer(props: PlaybackContainerProps) {
  const dispatch = useDispatch();
  const playState = useSelector(selectors.raw.$rawPlayState).playbackStatus;
  const isBoardReady = useSelector(selectors.raw.$rawIsoState).isBoardReady;

  const isPlaying = playState === 'playing';

  const callbacks = useMemo(
    () => ({
      onPlay: (play: boolean) => {
        dispatch(
          actions.playState.patch({
            playbackStatus: play ? 'playing' : 'idle',
          })
        );
      },
    }),
    []
  );

  useSpace(() => {
    callbacks.onPlay(!isPlaying);
  }, [isPlaying]);

  return (
    <Playback isDisabled={!isBoardReady} isPlaying={isPlaying} callbacks={callbacks}>
      {props.children}
    </Playback>
  );
}

export default PlaybackContainer;

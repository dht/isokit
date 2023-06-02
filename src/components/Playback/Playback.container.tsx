import { useDispatch, useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { useSpace } from '../../hooks/useSpace';
import { actions } from '../../store/iso.actions';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { Playback } from './Playback';

export type PlaybackContainerProps = {};

export function PlaybackContainer(props: PlaybackContainerProps) {
  const dispatch = useDispatch();
  const playState = useSelector(selectors.raw.$rawPlayState).playbackStatus;

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

  return <Playback isPlaying={isPlaying} callbacks={callbacks} />;
}

export default PlaybackContainer;

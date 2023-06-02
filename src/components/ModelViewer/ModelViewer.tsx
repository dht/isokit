import { Scene } from '@babylonjs/core';
import { useEffect } from 'react';
import { useBoard } from '../../hooks/useBoard';
import { animateCamera } from '../../isokit.cameras';
import { BabylonScene } from '../../isokit.scene';
import { Hud } from '../Hud/Hud';
import { IHudConfig, IHudItem, IHudTimeline } from '../Hud/Hud.types';
import { useCameraPosition } from '../Hud/hooks/useCameraPosition';
import { Loader } from '../Loader/Loader';
import { createBaseBoard } from './ModelViewer.board';
import { HudWrapper, LoaderWrapper, Wrapper } from './ModelViewer.style';

export type ModelViewerProps = {
  board: IBoard;
  config: IHudConfig;
  items: IHudItem[];
  timeline: IHudTimeline;
  onBoardLoaded: (scene: Scene, debugBabylon: boolean) => void;
};

export function ModelViewer(props: ModelViewerProps) {
  const { board, config, items, timeline } = props;

  const { width, height, color, glbPath, radius = 7, alpha = 0, beta = 1.5 } = config;

  const cameraPosition = useCameraPosition(timeline, {
    radius,
    alpha,
    beta,
  });

  const isReady = useBoard(createBaseBoard(glbPath, board), props.onBoardLoaded);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    animateCamera(cameraPosition);
  }, [cameraPosition, isReady]);

  function renderHud() {
    if (!isReady) {
      return (
        <LoaderWrapper>
          <Loader color={color} text='Loading...' debounce={500} />
        </LoaderWrapper>
      );
    }

    return (
      <HudWrapper>
        <Hud config={config} items={items} timeline={timeline} />
      </HudWrapper>
    );
  }

  return (
    <Wrapper
      className='ModelViewer-wrapper'
      data-testid='ModelViewer-wrapper'
      width={width}
      height={height}
    >
      <BabylonScene />
      {renderHud()}
    </Wrapper>
  );
}

export default ModelViewer;

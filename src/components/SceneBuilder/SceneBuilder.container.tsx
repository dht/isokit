import { useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import SceneBuilder from './SceneBuilder';

export type SceneBuilderContainerProps = {};

export function SceneBuilderContainer(props: SceneBuilderContainerProps) {
  const isoState = useSelector(selectors.raw.$rawIsoState);
  const isPositionPadOn = isoState.isPositionPadOn;
  const isPerspectiveOn = isoState.isPerspectiveOn;
  const isDimmerOn = isoState.isDimmerOn;
  const { dotId, layerId } = isoState;

  return (
    <SceneBuilder
      isPadOn={isPositionPadOn}
      isPerspectiveOn={isPerspectiveOn}
      isDimmerOn={isDimmerOn}
      dotId={dotId}
      layerId={layerId}
    />
  );
}

export default SceneBuilderContainer;

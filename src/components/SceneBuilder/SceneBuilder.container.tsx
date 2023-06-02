import { selectors } from '../../store/selectors/iso.selectors.index';
import SceneBuilder from './SceneBuilder';
import { useDispatch, useSelector } from '@gdi/store-base';

export type SceneBuilderContainerProps = {};

export function SceneBuilderContainer(props: SceneBuilderContainerProps) {
  const isoState = useSelector(selectors.raw.$rawIsoState);
  const isPositionPadOn = isoState.isPositionPadOn;
  const isBezierEditorOn = isoState.isBezierOn;
  const isPerspectiveOn = isoState.isPerspectiveOn;
  const isDimmerOn = isoState.isDimmerOn;

  return (
    <SceneBuilder
      isPadOn={isPositionPadOn}
      isBezierOn={isBezierEditorOn}
      isPerspectiveOn={isPerspectiveOn}
      isDimmerOn={isDimmerOn}
    />
  );
}

export default SceneBuilderContainer;

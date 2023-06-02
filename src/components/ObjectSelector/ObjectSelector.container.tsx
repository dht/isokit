import { useDispatch, useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { IIsoLayer, ISceneItem } from '../../store/iso.types';
import ObjectSelector from './ObjectSelector';
import { scene } from '../../isokit.globals';
import { actions } from '../../store/iso.actions';

export type ObjectSelectorContainerProps = {};

export function ObjectSelectorContainer(_props: ObjectSelectorContainerProps) {
  const dispatch = useDispatch();
  const layerItems = useSelector(selectors.components.$layersForSelector);
  const cameraItems = useSelector(selectors.components.$cameraForSelector);
  const meshItems = useSelector(selectors.components.$meshesForSelector);
  const isoState = useSelector(selectors.raw.$rawIsoState);

  const callbacks = useMemo(
    () => ({
      onSelect: (item: ISceneItem) => {
        if (item.isCamera) {
          scene.setActiveCameraByName(item.id);
        }

        dispatch({
          type: 'iso/selection',
          item,
        });
      },
      onToggleActive: (item: ISceneItem & { isActive: boolean }) => {
        dispatch(
          actions.layers.patch(item.id, {
            isActive: !item.isActive,
          })
        );
      },
    }),
    [layerItems]
  );

  return (
    <ObjectSelector
      currentLayerId={isoState.layerId}
      layerItems={layerItems}
      cameraItems={cameraItems}
      meshItems={meshItems}
      callbacks={callbacks}
    />
  );
}

export default ObjectSelectorContainer;

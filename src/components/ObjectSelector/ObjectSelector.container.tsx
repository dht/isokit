import { useDispatch, useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { ISceneItem } from '../../store/iso.types';
import ObjectSelector from './ObjectSelector';
import { scene } from '../../isokit.globals';

export type ObjectSelectorContainerProps = {};

export function ObjectSelectorContainer(_props: ObjectSelectorContainerProps) {
  const dispatch = useDispatch();
  const layerItems = useSelector(selectors.components.$layersForSelector);
  const cameraItems = useSelector(selectors.components.$cameraForSelector);
  const meshItems = useSelector(selectors.components.$meshesForSelector);

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
    }),
    []
  );

  return (
    <ObjectSelector
      layerItems={layerItems}
      cameraItems={cameraItems}
      meshItems={meshItems}
      callbacks={callbacks}
    />
  );
}

export default ObjectSelectorContainer;

import { useDispatch, useSelector } from '@gdi/store-base';
import { useMemo } from 'react';
import { selectors } from '../../store/selectors/iso.selectors.index';
import { IItem } from '../../store/iso.types';
import ObjectSelector from './ObjectSelector';
import { scene } from '../../isokit.globals';

export type ObjectSelectorContainerProps = {};

export function ObjectSelectorContainer(_props: ObjectSelectorContainerProps) {
  const dispatch = useDispatch();
  const items = useSelector(selectors.base.$itemsForSelector);

  const callbacks = useMemo(
    () => ({
      onSelect: (item: IItem) => {
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

  return <ObjectSelector items={items} callbacks={callbacks} />;
}

export default ObjectSelectorContainer;

import classnames from 'classnames';
import { IIsoLayer, ISceneItem } from '../../store/iso.types';
import { Cameras, Item, Layers, Meshes, Wrapper } from './ObjectSelector.style';
import MultiButton from './_parts/MultiButton/MultiButton';

export type ObjectSelectorProps = {
  currentLayerId: string;
  cameraItems: ISceneItem[];
  layerItems: ISceneItem[];
  meshItems: ISceneItem[];
  callbacks: {
    onSelect: (item: ISceneItem) => void;
    onToggleActive: (item: ISceneItem) => void;
  };
};

export function ObjectSelector(props: ObjectSelectorProps) {
  const { currentLayerId, cameraItems, layerItems, meshItems, callbacks } = props;

  function renderItem(item: ISceneItem) {
    const { id, itemType, isCamera, isSelected } = item;

    const className = classnames('item', id, itemType, {
      selected: isSelected,
    });

    let text = isCamera ? id.substring(0, 3) : id;

    return (
      <Item key={id} className={className} onClick={() => callbacks.onSelect(item)}>
        {text}
      </Item>
    );
  }

  function renderCameraItems() {
    return cameraItems.map((item: ISceneItem) => renderItem(item));
  }

  function renderMeshItems() {
    return meshItems.map((item: ISceneItem) => renderItem(item));
  }

  return (
    <Wrapper className='ObjectSelector-wrapper' data-testid='ObjectSelector-wrapper'>
      <Cameras>
        {renderCameraItems()}
        <MultiButton
          value={currentLayerId}
          options={layerItems}
          onSelect={callbacks.onSelect}
          onToggleActive={callbacks.onToggleActive}
        />
      </Cameras>
      <Meshes>{renderMeshItems()}</Meshes>
    </Wrapper>
  );
}

export default ObjectSelector;

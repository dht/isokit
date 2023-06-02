import classnames from 'classnames';
import { ISceneItem } from '../../store/iso.types';
import {
  Cameras,
  Item,
  Layers,
  Meshes,
  Section,
  SectionContent,
  SectionIcon,
  Wrapper,
} from './ObjectSelector.style';

export type ObjectSelectorProps = {
  cameraItems: ISceneItem[];
  layerItems: ISceneItem[];
  meshItems: ISceneItem[];
  callbacks: {
    onSelect: (item: ISceneItem) => void;
  };
};

export function ObjectSelector(props: ObjectSelectorProps) {
  const { cameraItems, layerItems, meshItems, callbacks } = props;

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

  function renderLayerItems() {
    return layerItems.map((item: ISceneItem) => renderItem(item));
  }

  function renderMeshItems() {
    return meshItems.map((item: ISceneItem) => renderItem(item));
  }

  return (
    <Wrapper className='ObjectSelector-wrapper' data-testid='ObjectSelector-wrapper'>
      <Section>
        <SectionIcon></SectionIcon>
        <SectionContent>{renderCameraItems()}</SectionContent>
      </Section>
      <Section>
        <SectionIcon></SectionIcon>
        <SectionContent>{renderLayerItems()}</SectionContent>
      </Section>
      <Section>
        <SectionIcon></SectionIcon>
        <SectionContent>{renderMeshItems()}</SectionContent>
      </Section>
      {/* <Cameras>{renderCameraItems()}</Cameras>
      <Layers>{renderLayerItems()}</Layers>
      <Meshes>{renderMeshItems()}</Meshes> */}
    </Wrapper>
  );
}

export default ObjectSelector;

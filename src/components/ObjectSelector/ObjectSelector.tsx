import { IItem } from '../../store/iso.types';
import { Item, Wrapper } from './ObjectSelector.style';
import classnames from 'classnames';

export type ObjectSelectorProps = {
  items: IItem[];
  callbacks: {
    onSelect: (item: IItem) => void;
  };
};

export function ObjectSelector(props: ObjectSelectorProps) {
  const { items, callbacks } = props;

  function renderItem(item: IItem) {
    const className = classnames('item', {
      selected: item.isSelected,
    });

    return (
      <Item key={item.id} className={className} onClick={() => callbacks.onSelect(item)}>
        {item.id}
      </Item>
    );
  }

  function renderItems() {
    return items.map((item: IItem) => renderItem(item));
  }

  return (
    <Wrapper className='ObjectSelector-wrapper' data-testid='ObjectSelector-wrapper'>
      {renderItems()}
    </Wrapper>
  );
}

export default ObjectSelector;

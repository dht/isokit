import React, { useEffect, useRef, useState } from 'react';
import { Options, Wrapper, Item } from './MultiButton.style';
import { Item as ItemBase } from '../../ObjectSelector.style';
import { ISceneItem } from '../../../../store/iso.types';
import classnames from 'classnames';
import { useClickAway } from 'react-use';

export type MultiButtonProps = {
  value: string;
  options: ISceneItem[];
  onSelect: (layer: ISceneItem) => void;
  onToggleActive: (layer: ISceneItem) => void;
};

export function MultiButton(props: MultiButtonProps) {
  const { value, options } = props;
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [lastClose, setLastClose] = useState(0);

  useClickAway(ref, (ev) => {
    ev.stopPropagation();
    setLastClose(Date.now());
    setTimeout(() => {
      setVisible(false);
    });
  });

  function onClick(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const delta = Date.now() - lastClose;

    if (delta < 150) {
      return;
    }

    setVisible(true);
  }

  function onSelect(item: ISceneItem) {
    setVisible(false);
    props.onSelect(item);
  }

  function onToggleActive(item: ISceneItem, ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    ev.stopPropagation();
    props.onToggleActive(item);
  }

  function renderOption(option: ISceneItem) {
    const className = classnames('item layer', {
      selected: option.isSelected,
    });

    const classNameIcon = classnames('material-symbols-outlined icon', {
      active: (option as any).isActive,
    });

    return (
      <Item key={option.id} className={className} onClick={() => onSelect(option)}>
        <div className='title'>{option.id}</div>
        <span className={classNameIcon} onClick={(ev) => onToggleActive(option, ev)}>
          check_box
        </span>
      </Item>
    );
  }

  function renderOptions() {
    return options.map((option: ISceneItem) => renderOption(option));
  }

  return (
    <Wrapper className='MultiButton-wrapper' data-testid='MultiButton-wrapper'>
      <ItemBase key={'id'} className={'item layer selected'} onClick={onClick}>
        {value}
      </ItemBase>
      {visible && <Options ref={ref}>{renderOptions()}</Options>}
    </Wrapper>
  );
}

export default MultiButton;

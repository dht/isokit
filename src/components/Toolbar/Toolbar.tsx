import React from 'react';
import { Button, Wrapper } from './Toolbar.style';
import classnames from 'classnames';
import { useKey } from 'react-use';

export type ToolbarProps = {
  buttons: Json[];
  uiToggles: Json;
  onToggle: (id: string, isOn: boolean) => void;
};

export function Toolbar(props: ToolbarProps) {
  const { buttons, uiToggles } = props;

  function onClick(id: string, isOn: boolean) {
    props.onToggle(id, !isOn);
  }

  function renderButton(button: Json) {
    const isOn = uiToggles[button.id];

    return <ToolbarButton key={button.id} isOn={isOn} button={button} onClick={onClick} />;
  }

  function renderButtons() {
    return buttons.map((button: Json) => renderButton(button));
  }

  return (
    <Wrapper className='Toolbar-wrapper' data-testid='Toolbar-wrapper'>
      {renderButtons()}
    </Wrapper>
  );
}

function ToolbarButton(props: any) {
  const { button, isOn } = props;

  const className = classnames('button', {
    off: !isOn,
  });

  useKey(button.shortcut, () => props.onClick(button.id, isOn), {}, [isOn]);

  return (
    <Button
      key={button.id}
      className={className}
      onClick={() => props.onClick(button.id, isOn)}
      title={button.shortcut}
    >
      <span className='material-symbols-outlined'>{button.iconName}</span>
    </Button>
  );
}

export default Toolbar;

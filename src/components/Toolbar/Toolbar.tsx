import classnames from 'classnames';
import { useKey } from 'react-use';
import { Button, Wrapper } from './Toolbar.style';

export type ToolbarProps = {
  selectedId?: string;
  buttons: Json[];
  uiToggles: Json;
  onToggle: (button: Json, isOn?: boolean) => void;
};

export function Toolbar(props: ToolbarProps) {
  const { buttons, uiToggles, selectedId } = props;

  function renderButton(button: Json) {
    const isOn = uiToggles[button.id];

    return (
      <ToolbarButton
        key={button.id}
        isSelected={button.id === selectedId}
        isOn={isOn}
        button={button}
        onClick={() => props.onToggle(button, !isOn)}
      />
    );
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
  const { button, isOn, isSelected } = props;

  const className = classnames('button', {
    selected: isSelected,
    off: !isOn,
  });

  useKey(button.shortcut, () => props.onClick(button.id, isOn), {}, [isOn]);

  return (
    <Button
      key={button.id}
      className={className}
      onClick={() => props.onClick(button)}
      title={button.shortcut}
    >
      <span className='material-symbols-outlined'>{button.iconName}</span>
    </Button>
  );
}

export default Toolbar;

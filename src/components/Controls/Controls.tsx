import classnames from 'classnames';
import { useSetState } from 'react-use';
import { useCustomEvent } from '../../hooks/useCustomEvent';
import { IPosFlat } from '../../store/iso.types';
import { ControlField, Wrapper } from './Controls.style';
import { emptyFlatPos } from './Controls.data';

export type ControlsProps = {
  inputs: Json[];
  isBezier?: boolean;
  isDot?: boolean;
  initialValues?: Json;
  onChange: (change: Json) => void;
};

export function Controls(props: ControlsProps) {
  const { inputs = [], initialValues, isBezier, isDot } = props;
  const [state, patchState] = useSetState<IPosFlat>(initialValues);

  useCustomEvent('iso/pos', (posFlat: IPosFlat) => {
    const { clearEmpty } = posFlat;

    if (clearEmpty) {
      patchState({ ...emptyFlatPos });
    }

    patchState({ ...posFlat });
  });

  function onChange(ev: any, id: string) {
    const value = ev.target.value;
    patchState({ [id]: value });
    props.onChange({ [id]: value });
  }

  function onKeyDown(ev: any) {
    ev.stopPropagation();
  }

  function renderInput(input: Json) {
    const { id } = input;

    const label = id.substr(0, 3);

    return (
      <ControlField key={input.id}>
        <label>{label}</label>
        <input
          onKeyDown={onKeyDown}
          type='number'
          value={(state as any)[id] ?? ''}
          onChange={(ev) => onChange(ev, id)}
        />
      </ControlField>
    );
  }

  function renderInputs() {
    return inputs.map((input: Json) => renderInput(input));
  }

  const className = classnames('Controls-wrapper', {
    bezier: isBezier,
    dot: isDot,
  });

  return (
    <Wrapper className={className} data-testid='Controls-wrapper'>
      {renderInputs()}
    </Wrapper>
  );
}

export default Controls;

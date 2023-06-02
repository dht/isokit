import classnames from 'classnames';
import { useSetState } from 'react-use';
import { useCustomEvent } from '../../hooks/useCustomEvent';
import { IPosFlat } from '../../store/iso.types';
import { emptyFlatPos } from './Controls.data';
import { ControlField, Value, Wrapper } from './Controls.style';
import { allFields } from './_parts';

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

  function onChange(change: Json) {
    patchState(change);
    props.onChange(change);
  }

  function renderField(field: Json) {
    const { id, fieldType = 'number' } = field;

    const label = id.substr(0, 3);
    const value = (state as any)[id] ?? '';

    const Cmp = allFields[fieldType];

    if (!Cmp) {
      return null;
    }

    return (
      <ControlField key={field.id}>
        <label>{label}</label>
        <Value>
          <Cmp field={field} value={value} onChange={onChange} />
        </Value>
      </ControlField>
    );
  }

  function renderFields() {
    return inputs.map((field: Json) => renderField(field));
  }

  const className = classnames('Controls-wrapper', {
    bezier: isBezier,
    dot: isDot,
  });

  return (
    <Wrapper className={className} data-testid='Controls-wrapper'>
      {renderFields()}
    </Wrapper>
  );
}

export default Controls;

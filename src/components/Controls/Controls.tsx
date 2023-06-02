import classnames from 'classnames';
import { ControlField, Empty, Value, Wrapper } from './Controls.style';
import { allFields } from './_parts';

export type ControlsProps = {
  inputs: Json[];
  isBezier?: boolean;
  isDot?: boolean;
  isSetPiece?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  values?: Json;
  onChange: (change: Json) => void;
  children?: React.ReactNode;
};

export function Controls(props: ControlsProps) {
  const { inputs = [], values = {}, isBezier, isDot, isEmpty, emptyMessage } = props;

  function onChange(change: Json) {
    props.onChange(change);
  }

  function renderField(field: Json) {
    const { id, fieldType = 'number' } = field;

    const label = id.substr(0, 3);
    const value = (values as any)[id] ?? '';

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
    if (isEmpty) {
      return <Empty>{emptyMessage}</Empty>;
    }

    return inputs.map((field: Json) => renderField(field));
  }

  const className = classnames('Controls-wrapper', {
    bezier: isBezier,
    dot: isDot,
  });

  return (
    <Wrapper className={className} data-testid='Controls-wrapper'>
      {renderFields()}
      {props.children}
    </Wrapper>
  );
}

export default Controls;

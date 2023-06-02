import { Wrapper } from './Input.style';

export type InputProps = {
  field: any;
  value: string;
  onChange: (change: Json) => void;
};

export function Input(props: InputProps) {
  const { field } = props;
  const { id, value, fieldType } = field;

  function onChange(ev: any) {
    const value = ev.target.value;
    props.onChange({ [id]: value });
  }

  function onKeyDown(ev: any) {
    ev.stopPropagation();
  }

  return (
    <Wrapper
      className='Input-wrapper'
      data-testid='Input-wrapper'
      onKeyDown={onKeyDown}
      type={fieldType}
      value={value}
      onChange={onChange}
    ></Wrapper>
  );
}

export default Input;

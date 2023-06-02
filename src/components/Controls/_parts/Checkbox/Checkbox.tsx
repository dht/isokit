import { Wrapper } from './Checkbox.style';

export type CheckboxProps = {
  field: any;
  value: string;
  onChange: (change: Json) => void;
};

export function Checkbox(props: CheckboxProps) {
  const { field, value } = props;
  const { id } = field;

  function onChange(ev: any) {
    const value = ev.target.checked;

    props.onChange({ [id]: value });
  }

  return (
    <Wrapper className='Checkbox-wrapper' data-testid='Checkbox-wrapper'>
      <input type='checkbox' value={value} onChange={onChange} />
      <span className='checkmark'></span>
    </Wrapper>
  );
}

export default Checkbox;

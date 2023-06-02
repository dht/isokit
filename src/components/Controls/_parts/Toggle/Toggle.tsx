import { Wrapper } from './Toggle.style';

export type ToggleProps = {
  field: any;
  value: string;
  onChange: (change: Json) => void;
};

export function Toggle(props: ToggleProps) {
  const { field } = props;
  const { id, value } = field;

  function onChange(ev: any) {
    const value = ev.target.value;
    props.onChange({ [id]: value });
  }

  return (
    <Wrapper className='Toggle-wrapper' data-testid='Toggle-wrapper'>
      <input type='checkbox' value={value} onChange={onChange} />
      <span className='slider round'></span>
    </Wrapper>
  );
}

export default Toggle;

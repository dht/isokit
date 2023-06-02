import { ISheetCell } from '../../Sheet.types';
import { Wrapper } from './Cell.style';
import classnames from 'classnames';
import { areaDimension } from './Cell.utils';

export type CellProps = {
  data: ISheetCell;
};

export function Cell(props: CellProps) {
  const { data } = props;
  const { x, y, value, cellType, isLoading } = data;

  const style: React.CSSProperties = {
    gridArea: areaDimension(y, x, 1, 1),
  };

  const className = classnames('Cell-wrapper', cellType, {
    firstCol: x === 1,
    loading: isLoading,
    empty: value === '-',
  });

  function renderInner() {
    if (isLoading) {
      return <span>loading</span>;
    }

    return value;
  }

  return (
    <Wrapper className={className} data-testid='Cell-wrapper' style={style}>
      {renderInner()}
    </Wrapper>
  );
}

export default Cell;

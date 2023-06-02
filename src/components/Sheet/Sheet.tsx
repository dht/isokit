import { useEffect, useRef } from 'react';
import { useArrows } from './Sheet.hooks';
import { Wrapper } from './Sheet.style';
import { ISheetCell } from './Sheet.types';
import { Cell } from './_parts/Cell/Cell';
import { SelectCell } from './_parts/SelectCell/SelectCell';

export type SheetProps = {
  cells: ISheetCell[];
  onSelect: (x: number, y: number) => void;
  onChange: (x: number, y: number, value: string) => void;
};

export function Sheet(props: SheetProps) {
  const { cells } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [coord, setCoord] = useArrows({ x: 0, y: 0 });

  useEffect(() => {
    props.onSelect(coord.x, coord.y);
  }, [coord]);

  function onChange(x: number, y: number, value: string) {
    props.onChange(coord.x, coord.y, value);

    if (!value) {
      return;
    }

    // nudge down
    setCoord({ x, y: y + 1 });
    props.onSelect(x, y + 1);
  }

  function onClick(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!ref.current) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const x = ev.clientX - bounds.left;
    const y = ev.clientY - bounds.top;
    const cellX = Math.floor(x / 70) + 1;
    const cellY = Math.floor(y / 30) + 1;

    setCoord({ x: cellX, y: cellY });
    props.onSelect(cellX, cellY);
  }

  function renderCell(cell: ISheetCell, index: number) {
    return <Cell key={cell.id + index} data={cell} />;
  }

  function renderCells() {
    return cells.map((cell: ISheetCell, index) => renderCell(cell, index));
  }

  function renderSelect() {
    const value =
      cells.find((cell: ISheetCell) => {
        return cell.x === coord.x && cell.y === coord.y;
      })?.value ?? '';

    return (
      <SelectCell
        coord={coord}
        value={value}
        onChange={(newValue) => onChange(coord.x, coord.y, newValue)}
      />
    );
  }

  return (
    <Wrapper ref={ref} className='Sheet-wrapper' data-testid='Sheet-wrapper' onMouseDown={onClick}>
      {renderCells()}
      {renderSelect()}
    </Wrapper>
  );
}

export default Sheet;

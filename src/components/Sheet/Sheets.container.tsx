import { useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import Sheet from './Sheet';

export type SheetContainerProps = {};

export function SheetContainer(props: SheetContainerProps) {
  const cells = useSelector(selectors.dots.$sheets);

  return <Sheet cells={cells} onChange={() => {}} onSelect={() => {}} />;
}

export default SheetContainer;

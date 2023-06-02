import { useSelector } from '@gdi/store-base';
import { selectors } from '../../store/selectors/iso.selectors.index';
import UIPermutation from './UIPermutation';

export type UIPermutationContainerProps = {};

export function UIPermutationContainer(props: UIPermutationContainerProps) {
  const { perm, index } = useSelector(selectors.components.$uiPermutation);

  const arr = Object.values(perm);

  return <UIPermutation index={index} arr={arr} />;
}

export default UIPermutationContainer;

import { useNodes } from '@gdi/ui';
import 'reactflow/dist/style.css';
import Plumber from './Plumber';

import { data } from './Plumber.data';

export type PlumberContainerProps = {};

export function PlumberContainer(_props: PlumberContainerProps) {
  const { nodes, edges, callbacks } = useNodes(data);

  return <Plumber nodes={nodes} edges={edges} callbacks={callbacks} />;
}

export default PlumberContainer;

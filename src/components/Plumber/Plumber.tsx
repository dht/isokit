import React from 'react';
import { Wrapper } from './Plumber.style';
import { Flow } from '@gdi/ui';
import ReactFlow, {
  Controls,
  Edge,
  MiniMap,
  Node,
  OnConnect,
  OnEdgesChange,
  OnInit,
  OnNodesChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './nodes';

export type PlumberProps = {
  nodes: Node[];
  edges: Edge[];
  callbacks: {
    onConnect?: OnConnect;
    onInit?: OnInit;
    onNodesChange?: OnNodesChange;
    onEdgesChange?: OnEdgesChange;
    onClick: (node: any) => void;
    onDoubleClick: (node: any) => void;
  };
};

export function Plumber(props: PlumberProps) {
  const { nodes, edges, callbacks } = props;

  return (
    <Wrapper className='Plumber-wrapper' data-testid='Plumber-wrapper'>
      <Flow nodes={nodes} edges={edges} callbacks={callbacks} />
    </Wrapper>
  );
}

export default Plumber;

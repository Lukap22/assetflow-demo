import { Button } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import ReactFlow, {
  addEdge, applyEdgeChanges,
  applyNodeChanges, Edge, Node
} from 'reactflow';
import useUndoable from 'use-undoable';
import CustomNode from './CustomNode';
import styles from './Flow.module.css';
import TextUpdaterNode from './TextUpdaterNode';


const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
  },

  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 100, y: 200 },
    type: 'custom',
    className: styles.customNode,
  },
  {
    id: '5',
    data: { label: 'Node 5' },
    position: { x: 500, y: 300 },
    type: 'textUpdater',
  },
  {
    id: '6',
    data: { label: 'Node 6' },
    position: { x: 500, y: 500 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-5', source: '3', target: '5' },
];

const nodeTypes = {
  custom: CustomNode,
  textUpdater: TextUpdaterNode

};

const defaultEdgeOptions = {
  animated: false,
  type: 'smoothstep',
};

function Flow() {
  const [elements, setElements, { undo, redo, reset }] = useUndoable({
    nodes: initialNodes,
    edges: initialEdges,
  });
  const { nodes, edges } = elements

  useEffect(() => {
    console.log(elements);
  }, [elements]);

  const triggerUpdate = useCallback(
    (t: any, v: any) => {
      // To prevent a mismatch of state updates,
      // we'll use the value passed into this
      // function instead of the state directly.
      setElements(e => ({
        nodes: t === 'nodes' ? v : e.nodes,
        edges: t === 'edges' ? v : e.edges,
      }));
    },
    [setElements]
  );


  // We declare these callbacks as React Flow suggests,
  // but we don't set the state directly. Instead, we pass
  // it to the triggerUpdate function so that it alone can
  // handle the state updates.

  const onNodesChange = useCallback(
    (changes: any) => {
      triggerUpdate('nodes', applyNodeChanges(changes, elements.nodes));
    },
    [triggerUpdate, elements.nodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      triggerUpdate('edges', applyEdgeChanges(changes, elements.edges));
    },
    [triggerUpdate, elements.edges]
  );

  const onConnect = useCallback(
    (connection: any) => {
      triggerUpdate('edges', addEdge(connection, elements.edges));
    },
    [triggerUpdate, elements.edges]
  );

  useHotkeys('ctrl+z', undo, [undo]);
  useHotkeys('ctrl+shift+z', redo, [redo]);


  return (
    <div className={styles.flow} style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      <Buttons undo={undo} redo={redo} reset={reset} />
      <ReactFlow
        nodes={nodes}
        onNodesChange={(e: any) => {
          console.log('onNodesChange', e);
          onNodesChange(e);
        }}
        onChange={(e: any) => {
          console.log('onChange', e);
        }}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      // style={rfStyle}
      />
    </div>
  );
}

export default Flow;


const Buttons = ({ undo, redo, reset }: any) => (
  <div style={{ top: 16, right: 16, }} className='fixed top-16 right-16 flex flex-row'>
    <Button onClick={() => undo()}>Undo</Button>
    <Button onClick={() => redo()}>Redo</Button>
    <Button onClick={() => reset()}>Reset</Button>
  </div>
);
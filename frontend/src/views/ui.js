// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { TextNode } from '../nodes/textNode';
import { ValidatorNode } from '../nodes/ValidatorNode';
import { TransformerNode } from '../nodes/TransformerNode';
import { nodeTemplates } from '../nodes/MultipleNodes';
import 'reactflow/dist/style.css';
import { FaBook, FaCalculator, FaStar } from 'react-icons/fa';
import { parsePipeline } from '../API/pipeLineSubmitAPI';
import CustomModal from '../components/Modal';




const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  text: TextNode,
  transformerNode: TransformerNode,
  validatorNode: ValidatorNode,
  textProcessor: nodeTemplates.textProcessor("Text", <FaStar />),
  apiCall: nodeTemplates.apiCall("Call API", <FaBook />),
  condition: nodeTemplates.condition("Condition", <FaCalculator />)
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [dagResult, setDagResult] = useState(null);

  const handleSubmitPipeline = () => {
    const pipeline = { nodes, edges };

    parsePipeline(pipeline, {
      onSuccess: ({ num_nodes, num_edges, is_dag }) => {
        console.log('Pipeline submitted successfully:', { num_nodes, num_edges, is_dag });

        if (is_dag) {
          // Success case: valid DAG
          setDagResult({
            type: 'success',
            num_nodes,
            num_edges,
            is_dag,
          });
        } else {
          // Error case: cycle detected
          setDagResult({
            type: 'error',
            message: 'You have a cycle in your workflow. Please fix it and try again.',
          });
        }
        setModalOpen(true);
      },
      onError: (error) => {
        console.error('Error submitting pipeline:', error);
        setDagResult({
          type: 'error',
          message: 'Unexpected error occurred. Please try again later.',
        });
        setModalOpen(true);
      },
    });
  };


  return (
    <div ref={reactFlowWrapper} style={{ width: '100wv', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>

      <div className="text-center mt-4">
        <button
          onClick={handleSubmitPipeline}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          style={{
            padding: '8px 18px',
            background: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
            transition: 'background 0.2s',
          }}
        >
          Submit Pipeline
        </button>
      </div>
      <CustomModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        type={dagResult?.type === 'success' ? 'success' : 'error'}
        title={dagResult?.type === 'success' ? 'Pipeline Submitted' : 'DAG Cycle Error'}
      >
        {dagResult ? (
          <>
            <p><strong>Total Nodes:</strong> {dagResult.num_nodes ?? 'N/A'}</p>
            <p><strong>Total Edges:</strong> {dagResult.num_edges ?? 'N/A'}</p>
            {dagResult.type === 'success' ? (
              <p><strong>Cycle Detected (DAG):</strong> No</p>
            ) : (
              <>
                <p><strong>Cycle Detected (DAG):</strong> Yes</p>
                <p>{dagResult.message}</p>
              </>
            )}
          </>
        ) : null}
      </CustomModal>

    </div>
  )
}


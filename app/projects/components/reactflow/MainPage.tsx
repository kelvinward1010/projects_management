"use client"
import React, { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    ConnectionLineType,
    Panel,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from 'reactflow';
import dagre from 'dagre';

import { DataCustomFromProject } from './data'
import CustomNode from './CustomNode';
import CustomNodeEpic from './CustomNodeEpic';
import CustomNodeStory from './CustomNodeStory';

interface Props{
    project?: any;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 150;

const getLayoutedElements = (nodes: any, edges: any, direction = 'LR') => {
    const isHorizontal = direction === 'TB';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node: any) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge: any) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node: any) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? 'left' : 'top';
        node.sourcePosition = isHorizontal ? 'right' : 'bottom';

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
};



const nodeTypes = {
    customNode: CustomNode,
    customNodeEpic: CustomNodeEpic,
    customNodeStory: CustomNodeStory,
};

function MainPage({
    project
}:Props) {
    const {dataNodes: nodesData, dataEdges: edgesData} = DataCustomFromProject(project);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodesData,
        edgesData
    );
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

    const onConnect = useCallback(
        (params: any) =>
            setEdges((eds) =>
                addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
            ),
        []
    );
    const onLayout = useCallback(
        (direction: any) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                nodes,
                edges,
                direction
            );

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges]
    );
    DataCustomFromProject(project)
    
    return (
        <ReactFlowProvider>
            {nodesData && <div style={{height: '900px', width: '100%'}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    fitView
                    className='bg-black'
                >
                    <Panel position="top-right" >
                        <button onClick={() => onLayout('TB')} className='text-white p-2 bg-teal-600 rounded'>vertical layout</button>
                        <button onClick={() => onLayout('LR')} className='text-white p-2 bg-teal-600 ml-2 rounded'>horizontal layout</button>
                    </Panel>
                </ReactFlow>
            </div>}
        </ReactFlowProvider>
    )
}

export default MainPage
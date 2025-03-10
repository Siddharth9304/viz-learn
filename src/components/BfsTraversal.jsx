import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDashBoardElement } from "../dashboardElementSlice"
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import { div } from "framer-motion/client";
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: -100, y: -100 }, data: { label: '2' } },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'step' },
];
 
export default function BfsTraversal() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setDashBoardElement("BFS Traversal"))
    },[]);

 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const darkMode = useSelector((state) => state.themeSlice.darkMode);
 
  return (
    <>
      <div className="border rounded md:col-start-1 md:col-end-5 lg:col-start-3 lg:col-end-7 md:row-start-2 md:row-end-11 md:m-5 p-5 flex justify-center">
        <div className="text-3xl">We are currently working on this visualizer.</div>
      </div>
      <div className="border rounded h-150 md:h-auto md:col-start-5 lg:col-start-7 md:col-end-12 md:row-start-2 md:row-end-11 md:m-5 p-5">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}

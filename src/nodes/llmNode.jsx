// llmNode.js

import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';

export const LLMNode = ({ id, data }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`llm-node node-base ${isDragging ? 'dragging' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="node-header">
        <span className="node-icon">🤖</span>
        <span className="node-title">LLM</span>
      </div>
      <div className="node-content">
        <div className="llm-description">
          This is a Large Language Model node that processes text inputs and generates responses.
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        className="handle handle-left"
        style={{ top: `${100/3}%` }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        className="handle handle-left"
        style={{ top: `${200/3}%` }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className="handle handle-right"
      />
    </div>
  );
};

export default memo(LLMNode);

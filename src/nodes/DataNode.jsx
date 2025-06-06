import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';

const DataNode = ({ data }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`data-node node-base ${isDragging ? 'dragging' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="node-header">
        <span className="node-icon">📊</span>
        <span className="node-title">Data Node</span>
      </div>
      <div className="node-content">
        <p className="node-description">{data.label || 'Data Source'}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="handle handle-right"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="handle handle-left"
      />
    </div>
  );
};

export default memo(DataNode); 
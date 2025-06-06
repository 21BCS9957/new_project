// inputNode.js

import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';

const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const [isDragging, setIsDragging] = useState(false);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`input-node node-base ${isDragging ? 'dragging' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="node-header">
        <span className="node-icon">📥</span>
        <span className="node-title">Input</span>
      </div>
      <div className="node-content">
        <div className="input-group">
          <label>
            Name:
            <input 
              type="text" 
              value={currName} 
              onChange={handleNameChange}
              className="input-field"
              placeholder="Enter input name..."
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Type:
            <select 
              value={inputType} 
              onChange={handleTypeChange}
              className="input-select"
            >
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        className="handle handle-right"
      />
    </div>
  );
};

export default memo(InputNode);

// inputNode.js

import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';
import { BaseNode } from './BaseNode';

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

  const nodeContent = (
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
  );

  const outputs = [
    { id: 'value' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={outputs}
      style={{
        width: 250,
        height: 'auto',
        minHeight: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {nodeContent}
    </BaseNode>
  );
};

export default memo(InputNode);

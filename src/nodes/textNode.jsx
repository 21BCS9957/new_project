// textNode.js

import React, { memo, useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';

const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Extract variables from text
  useEffect(() => {
    const variableRegex = /{{([^}]+)}}/g;
    const matches = [...currText.matchAll(variableRegex)];
    const newVariables = matches.map(match => match[1].trim());
    setVariables(newVariables);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`text-node node-base ${isDragging ? 'dragging' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="node-header">
        <span className="node-icon">📝</span>
        <span className="node-title">Text Node</span>
      </div>
      <div className="node-content">
        <textarea
          value={currText}
          onChange={handleTextChange}
          className="text-node-textarea"
          placeholder="Enter text with {{variables}}..."
          rows={4}
        />
      </div>
      
      {/* Variable Handles */}
      {variables.map((variable, index) => (
        <Handle
          key={`input-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className="handle handle-left"
          style={{ top: `${((index + 1) * 100) / (variables.length + 1)}%` }}
        />
      ))}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="handle handle-right"
      />
    </div>
  );
};

export default memo(TextNode);

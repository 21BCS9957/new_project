import React, { useState, useEffect, memo } from 'react';
import { BaseNode } from './BaseNode';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';

const DataFilterNode = ({ id, data }) => {
  const [array, setArray] = useState(data?.array || '[]');
  const [condition, setCondition] = useState(data?.condition || 'x > 0');
  const [error, setError] = useState('');
  const [result, setResult] = useState('[]');
  const [isDragging, setIsDragging] = useState(false);

  // Update when input data changes
  useEffect(() => {
    if (data?.input) {
      try {
        const inputData = JSON.parse(data.input);
        if (Array.isArray(inputData)) {
          setArray(JSON.stringify(inputData, null, 2));
        }
      } catch (err) {
        setError('Invalid input data');
      }
    }
  }, [data?.input]);

  // Process the array when array or condition changes
  useEffect(() => {
    try {
      const parsedArray = JSON.parse(array);
      if (!Array.isArray(parsedArray)) {
        throw new Error('Input must be an array');
      }

      // Safely evaluate the condition
      const filterFn = (x) => {
        try {
          // Replace the condition with safe evaluation
          const safeCondition = condition
            .replace(/[^a-zA-Z0-9\s><=!&|()+\-*/%]/g, '') // Remove potentially dangerous characters
            .trim();
          return eval(safeCondition); // eslint-disable-line no-eval
        } catch (err) {
          return false;
        }
      };

      const filteredResult = parsedArray.filter(filterFn);
      setResult(JSON.stringify(filteredResult, null, 2));
      setError('');
    } catch (err) {
      setError(err.message);
      setResult('[]');
    }
  }, [array, condition]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`filter-node node-base ${isDragging ? 'dragging' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="node-header">
        <span className="node-icon">🔍</span>
        <span className="node-title">Filter Node</span>
      </div>
      <div className="node-content">
        <p className="node-description">{data.label || 'Data Filter'}</p>
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

export default memo(DataFilterNode); 
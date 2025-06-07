import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';
import { BaseNode } from './BaseNode';

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

  const nodeContent = (
    <div className="node-content filter-node-content">
      <div className="filter-description">
        {data.label || 'Data Filter'}
      </div>
      <div className="filter-input-container">
        <div className="filter-group">
          <label className="filter-label">
            Array:
            <textarea
              value={array}
              onChange={(e) => setArray(e.target.value)}
              className="filter-textarea"
              rows={3}
              placeholder="Enter array..."
            />
          </label>
        </div>
        <div className="filter-group">
          <label className="filter-label">
            Condition:
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="filter-input"
              placeholder="Enter condition..."
            />
          </label>
        </div>
      </div>
      {error && (
        <div className="filter-error">
          {error}
        </div>
      )}
      <div className="filter-result">
        <div className="filter-result-label">Result:</div>
        <div className="filter-result-value">{result}</div>
      </div>
    </div>
  );

  const inputs = [
    { id: 'input' }
  ];

  const outputs = [
    { id: 'output' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter Node"
      inputs={inputs}
      outputs={outputs}
      style={{
        width: 300,
        height: 'auto',
        minHeight: 250,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {nodeContent}
    </BaseNode>
  );
};

export default DataFilterNode; 
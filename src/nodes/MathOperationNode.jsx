import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';
import { BaseNode } from './BaseNode';

const MathOperationNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || '+');
  const [value1, setValue1] = useState(data?.value1 || 0);
  const [value2, setValue2] = useState(data?.value2 || 0);
  const [isDragging, setIsDragging] = useState(false);

  const calculateResult = () => {
    switch (operation) {
      case '+':
        return value1 + value2;
      case '-':
        return value1 - value2;
      case '*':
        return value1 * value2;
      case '/':
        return value2 !== 0 ? value1 / value2 : 'Error: Division by zero';
      default:
        return 'Invalid operation';
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const nodeContent = (
    <div className="node-content">
      <div className="math-input-group">
        <label>
          Value 1:
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(Number(e.target.value))}
            className="math-input"
          />
        </label>
      </div>
      <div className="math-input-group">
        <label>
          Operation:
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="math-select"
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
        </label>
      </div>
      <div className="math-input-group">
        <label>
          Value 2:
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(Number(e.target.value))}
            className="math-input"
          />
        </label>
      </div>
      <div className="math-result">
        = {calculateResult()}
      </div>
    </div>
  );

  const inputs = [
    { id: 'value1' },
    { id: 'value2' }
  ];

  const outputs = [
    { id: 'result' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math Operation"
      inputs={inputs}
      outputs={outputs}
      style={{
        width: 250,
        height: 'auto',
        minHeight: 200,
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

export default MathOperationNode; 
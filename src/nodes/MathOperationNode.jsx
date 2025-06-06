import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';

const MathOperationNode = ({ data }) => {
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

  return (
    <div 
      className={`math-node node-base ${isDragging ? 'dragging' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="node-header">
        <span className="node-icon">🔢</span>
        <span className="node-title">Math Operation</span>
      </div>
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

export default memo(MathOperationNode); 
import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';

const CounterNode = ({ data }) => {
  const [count, setCount] = useState(data?.initialValue || 0);
  const [step, setStep] = useState(data?.step || 1);
  const [isDragging, setIsDragging] = useState(false);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`counter-node node-base ${isDragging ? 'dragging' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="node-header">
        <span className="node-icon">🔢</span>
        <span className="node-title">Counter</span>
      </div>
      <div className="node-content">
        <div className="counter-display">{count}</div>
        <div className="counter-controls">
          <button className="counter-button" onClick={decrement}>-</button>
          <button className="counter-button" onClick={increment}>+</button>
        </div>
        <div className="counter-step">
          <label>
            Step:
            <input
              type="number"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              className="counter-input"
            />
          </label>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="handle handle-right"
      />
    </div>
  );
};

export default memo(CounterNode); 
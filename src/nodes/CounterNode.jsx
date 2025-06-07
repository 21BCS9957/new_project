import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';
import { BaseNode } from './BaseNode';

const CounterNode = ({ id, data }) => {
  const [count, setCount] = useState(data?.initialCount || 0);
  const [step, setStep] = useState(data?.step || 1);
  const [isRunning, setIsRunning] = useState(false);
  const [interval, setInterval] = useState(data?.interval || 1000);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCount(prev => prev + step);
      }, interval);
    }
    return () => clearInterval(timer);
  }, [isRunning, step, interval]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const nodeContent = (
    <div className="node-content">
      <div className="counter-display">
        {count}
      </div>
      <div className="counter-controls">
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className="counter-button"
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button 
          onClick={() => setCount(0)}
          className="counter-button"
        >
          Rest
        </button>
      </div>
      <div className="counter-group">
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
      <div className="counter-group">
        <label>
          Interval (ms):
          <input
            type="number"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="counter-input"
          />
        </label>
      </div>
    </div>
  );

  const outputs = [
    { id: 'count' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Counter"
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

export default CounterNode; 
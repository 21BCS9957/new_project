import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';

const TimerNode = ({ id, data }) => {
  const [time, setTime] = useState(data?.initialTime || 0);
  const [interval, setInterval] = useState(data?.interval || 1000);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState(data?.mode || 'countdown');
  const [targetTime, setTargetTime] = useState(data?.targetTime || 60);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prev => {
          if (mode === 'countdown') {
            return prev <= 0 ? 0 : prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, interval);
    }
    return () => clearInterval(timer);
  }, [isRunning, interval, mode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`timer-node node-base ${isDragging ? 'dragging' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="node-header">
        <span className="node-icon">⏱️</span>
        <span className="node-title">Timer</span>
      </div>
      <div className="node-content">
        <div className="timer-display">
          {formatTime(time)}
        </div>
        <div className="timer-controls">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="timer-button"
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button 
            onClick={() => setTime(mode === 'countdown' ? targetTime : 0)}
            className="timer-button"
          >
            Reset
          </button>
        </div>
        <div className="timer-group">
          <label>
            Mode:
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="timer-select"
            >
              <option value="countdown">Countdown</option>
              <option value="countup">Count Up</option>
            </select>
          </label>
        </div>
        {mode === 'countdown' && (
          <div className="timer-group">
            <label>
              Target Time (seconds):
              <input
                type="number"
                value={targetTime}
                onChange={(e) => setTargetTime(Number(e.target.value))}
                className="timer-input"
              />
            </label>
          </div>
        )}
        <div className="timer-group">
          <label>
            Interval (ms):
            <input
              type="number"
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="timer-input"
            />
          </label>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-time`}
        className="handle handle-right"
      />
    </div>
  );
};

export default TimerNode; 
import React, { memo, useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';

const StringManipulationNode = ({ data }) => {
  const [text, setText] = useState(data?.text || '');
  const [operation, setOperation] = useState(data?.operation || 'uppercase');
  const [result, setResult] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Update when input data changes
  useEffect(() => {
    if (data?.input) {
      setText(data.input);
    }
  }, [data?.input]);

  // Process text when text or operation changes
  useEffect(() => {
    let processedText = '';
    switch (operation) {
      case 'uppercase':
        processedText = text.toUpperCase();
        break;
      case 'lowercase':
        processedText = text.toLowerCase();
        break;
      case 'capitalize':
        processedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        break;
      case 'reverse':
        processedText = text.split('').reverse().join('');
        break;
      case 'length':
        processedText = text.length.toString();
        break;
      default:
        processedText = text;
    }
    setResult(processedText);
  }, [text, operation]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`string-node node-base ${isDragging ? 'dragging' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="node-header">
        <span className="node-icon">📝</span>
        <span className="node-title">String Manipulation</span>
      </div>
      <div className="node-content">
        <div className="string-input-group">
          <label>
            Text:
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="string-textarea"
              placeholder="Enter text to manipulate..."
            />
          </label>
        </div>
        <div className="string-input-group">
          <label>
            Operation:
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="string-select"
            >
              <option value="uppercase">UPPERCASE</option>
              <option value="lowercase">lowercase</option>
              <option value="capitalize">Capitalize</option>
              <option value="reverse">Reverse</option>
              <option value="length">Length</option>
            </select>
          </label>
        </div>
        <div className="string-result">
          {result}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="handle handle-left"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="handle handle-right"
      />
    </div>
  );
};

export default memo(StringManipulationNode); 
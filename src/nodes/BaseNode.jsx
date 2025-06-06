import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  data,
  title,
  width = 200,
  height = 80,
  inputs = [],
  outputs = [],
  children,
  style = {},
}) => {
  const baseStyle = {
    width,
    height,
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    ...style,
  };

  const headerStyle = {
    borderBottom: '1px solid #eee',
    paddingBottom: '8px',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <div style={baseStyle}>
      <div style={headerStyle}>{title}</div>
      <div>{children}</div>
      
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: `${((index + 1) * 100) / (inputs.length + 1)}%` }}
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: `${((index + 1) * 100) / (outputs.length + 1)}%` }}
        />
      ))}
    </div>
  );
}; 
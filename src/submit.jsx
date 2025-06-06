import React, { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './uiverseButton.css'; // You’ll create this or put styles in index.css

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();
            const message = `
Pipeline Analysis:
----------------
Number of Nodes: ${data.num_nodes}
Number of Edges: ${data.num_edges}
Is Valid DAG: ${data.is_dag ? 'Yes' : 'No'}
            `;
            alert(message);
        } catch (error) {
            alert('Error submitting pipeline: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <button className="uiverse-button" onClick={handleSubmit} disabled={isLoading}>
                <div className="bg"></div>
                <div className="wrap">
                    <svg
                        className="path"
                        width="221"
                        height="42"
                        viewBox="0 0 221 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M182.674 2H203C211.837 2 219 9.16344 219 18V24C219 32.8366 211.837 40 203 40H18C9.16345 40 2 32.8366 2 24V18C2 9.16344 9.16344 2 18 2H47.8855"
                            strokeWidth="3"
                            strokeLinecap="round"
                        ></path>
                    </svg>
                    <div className="outline"></div>
                    <div className="content">
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </div>
                </div>
            </button>
        </div>
    );
};

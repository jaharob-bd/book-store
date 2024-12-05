import React from 'react';

const DefaultError = ({ status, message }) => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>{status} - Error</h1>
            <p>{message || 'An unexpected error occurred.'}</p>
        </div>
    );
};

export default DefaultError;

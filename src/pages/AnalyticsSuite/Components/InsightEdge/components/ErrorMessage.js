import React from 'react';

/**
 * Error message display component
 */
const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-100 text-red-800 border border-red-200 rounded px-4 py-4 mb-5">
      <p className="m-0"><strong>Error:</strong> {error}</p>
    </div>
  );
};

export default ErrorMessage;
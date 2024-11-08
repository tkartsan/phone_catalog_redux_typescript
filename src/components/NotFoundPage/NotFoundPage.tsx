import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">This page does not exist</h1>
      <p className="mb-8">The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <button 
        onClick={handleGoBack}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
      >
        Go back to Home Page
      </button>
    </div>
  );
};

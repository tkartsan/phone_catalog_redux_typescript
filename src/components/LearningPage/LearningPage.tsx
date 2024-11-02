import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LearningPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center text-2xl font-semibold'>
            <h1 className="text-3xl font-semibold mb-6">Practice and Learning Page</h1>
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                <button
                    className="p-4 border border-gray-300 rounded hover:bg-gray-200 border-solid border-bgColorGrey"
                    onClick={() => navigate('/learning/every')}
                >
                    .every method
                </button>
            </div>
        </div>
    );
};

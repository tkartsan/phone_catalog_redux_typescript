import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LearningPage: React.FC = () => {
    const navigate = useNavigate();

    const tasks = [
        { id: "every", label: ".every method" },
        { id: "concat", label: ".concat method" },
        { id: "find", label: ".find method" },
        { id: "pop", label: ".pop method" },
        { id: "push", label: ".push method" },
        { id: "reverse", label: ".reverse method" },
        { id: "shift", label: ".shift method" },
        { id: "unshift", label: ".unshift method" },
        { id: "slice", label: ".slice method" },
        { id: "sort", label: ".sort method" },
        { id: "splice", label: ".splice method" },
        { id: "includes", label: ".includes method" },
        { id: "join", label: ".join method" },
        { id: "forEach", label: ".forEach method" },
        { id: "filter", label: ".filter method" },
        { id: "flat", label: ".flat method" },
        { id: "flatMap", label: ".flatMap method" },
        { id: "map", label: ".map method" },
        { id: "some", label: ".some method" },
        { id: "reduce", label: ".reduce method" },
        { id: "reverseString", label: "Reverse String" }
    ];

    return (
        <div className='flex flex-col items-center text-2xl font-semibold'>
            <h1 className="text-3xl font-semibold mb-6">Practice and Learning Page</h1>
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                {tasks.map((task) => (
                    <button
                        key={task.id}
                        className="p-4 border border-gray-300 rounded hover:bg-gray-200 border-solid border-bgColorGrey"
                        onClick={() => navigate(`/learning/${task.id}`)}
                    >
                        {task.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

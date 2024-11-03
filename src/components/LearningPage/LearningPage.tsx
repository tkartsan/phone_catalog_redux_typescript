import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tasksData from '../../tasks.json'; // Adjust the path based on your project structure

interface Task {
    id: string;
    label: string;
}

export const LearningPage: React.FC = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        // Convert tasks object to an array with id and label directly from the imported data
        const tasksArray: Task[] = Object.entries(tasksData).map(([id, task]) => ({
            id,
            label: task.keyword + " method" // Assuming each task's label is based on its keyword
        }));
        setTasks(tasksArray);
    }, []);

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

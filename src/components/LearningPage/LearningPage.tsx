import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tasksData from '../../tasks.json'; 

interface Task {
    id: string;
    label: string;
}

export const LearningPage: React.FC = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const tasksArray: Task[] = Object.entries(tasksData).map(([id, task]) => ({
            id,
            label: task.keyword + " method" 
        }));
        setTasks(tasksArray);
    }, []);

    return (
        <div className='flex flex-col items-center text-2xl font-semibold'>
            <h1 className="text-3xl font-semibold mb-6">Practice Array Methods</h1>
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

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tasksData from './../../tasks.json';
import './EveryPage.css';

type Task = {
  title: string;
  description: string;
  example: string;
  defaultCode: string;
  tests: { input: any; expectedOutput: any }[];
};

const EveryPage: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const [task, setTask] = useState<Task | null>(null);
    const [userCode, setUserCode] = useState<string>('');
    const [result, setResult] = useState<string>('');

    useEffect(() => {
        // Load the task based on the URL parameter
        const taskData = tasksData[taskId || ''];
        if (taskData) {
            setTask(taskData);
            setUserCode(taskData.defaultCode);
        } else {
            setResult('Task not found');
        }
    }, [taskId]);

    const runCode = () => {
        if (!task) return;

        try {
            const userFunction = new Function('return ' + userCode)();

            // Run tests and check results
            const allTestsPassed = task.tests.every(({ input, expectedOutput }) =>
                userFunction(input) === expectedOutput
            );

            setResult(allTestsPassed ? 'All tests passed! Great job!' : 'Some tests failed. Please try again.');
        } catch (error) {
            setResult(`There was an error in your code: ${(error as Error).message}`);
        }
    };

    if (!task) {
        return <div className="every-page-container">Loading...</div>;
    }

    return (
        <div className="every-page-container">
            <h1>{task.title}</h1>
            <div className="every-page-description">
                <p>{task.description}</p>
                <p><strong>Example:</strong> {task.example}</p>
            </div>
            <textarea
                className="every-page-textarea"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
            />
            <button className="every-page-button" onClick={runCode}>Run</button>
            <div className="every-page-result">{result}</div>
        </div>
    );
};

export default EveryPage;

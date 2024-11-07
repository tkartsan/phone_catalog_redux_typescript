import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tasksData from '../../tasks.json';
import './JavaScriptTasksWithTests.css';

type Task = {
  title: string;
  description: string;
  example: string;
  defaultCode: string;
  tests: { input: any; expectedOutput: any }[];
  keyword?: string;
};

export const JavaScriptTasksWithTests: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const [task, setTask] = useState<Task | null>(null);
    const [userCode, setUserCode] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const taskData = tasksData[taskId || ''];
        if (taskData) {
            setTask(taskData);
            setUserCode(taskData.defaultCode);
        } else {
            setResult('Task not found');
            setIsSuccess(false);
        }
    }, [taskId]);

    const runCode = () => {
        if (!task) return;
    
        let keywordUsed = true;
    
        // Check if the keyword(s) are present in the user code
        if (task.keyword) {
            const keywords = task.keyword.split(',').map(kw => kw.trim());
            keywordUsed = keywords.every(kw => userCode.includes(kw));
        }
    
        try {
            const userFunction = new Function('return ' + userCode)();
    
            const allTestsPassed = task.tests.every(({ input, expectedOutput }) => {
                let output;
    
                // Ensure `input` is passed correctly depending on its type
                if (Array.isArray(input)) {
                    if (input.length > 1) {
                        // Spread input if it’s an array with multiple arguments
                        output = userFunction(...input);
                    } else {
                        // Pass as a single array if it contains one array element
                        output = userFunction(input[0]);
                    }
                } else {
                    // Pass primitive or non-array input as is
                    output = userFunction(input);
                }
    
                console.log("Output:", output);
    
                // Compare output and expectedOutput for arrays and primitive types
                if (Array.isArray(expectedOutput) && Array.isArray(output)) {
                    return areArraysEqual(output, expectedOutput);
                } else if (typeof expectedOutput === 'object' && typeof output === 'object') {
                    return JSON.stringify(output) === JSON.stringify(expectedOutput);
                } else {
                    return output === expectedOutput;
                }
            });
    
            if (allTestsPassed && keywordUsed) {
                setResult('All tests passed! Great job!');
                setIsSuccess(true);
            } else if (allTestsPassed && !keywordUsed) {
                setResult(`Your solution is correct, but you must use the "${task.keyword}" method.`);
                setIsSuccess(false);
            } else {
                setResult('You did it wrong. Please try again.');
                setIsSuccess(false);
            }
        } catch (error) {
            setResult(`There was an error in your code: ${(error as Error).message}`);
            setIsSuccess(false);
        }
    };
    
    // Helper function to check if two arrays are equal
    const areArraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((value, index) => value === arr2[index]);
    };

    if (!task) {
        return <div className="learning-page-container">Loading...</div>;
    }

    return (
        <div className="learning-page-container">
            <h1>{task.title}</h1>
            <div className="task-description">
                <p>{task.description}</p>
                <p><strong>Example:</strong> {task.example}</p>
            </div>
            <textarea
                className="code-textarea"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
            />
            <button className="run-button" onClick={runCode}>Run</button>
            <div className={`result-message ${isSuccess ? 'success' : 'failure'}`}>
                {result}
            </div>
        </div>
    );
};
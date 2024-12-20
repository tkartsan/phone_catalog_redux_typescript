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

    if (task.keyword) {
      const keywords = task.keyword.split(',').map(kw => kw.trim());
      keywordUsed = keywords.every(kw => userCode.includes(kw));
    }

    try {
      const userFunction = new Function('return ' + userCode)();

      const allTestsPassed = task.tests.every(({ input, expectedOutput }) => {
        let output;

        if (Array.isArray(input)) {
          if (input.length > 1) {
            output = userFunction(...input);
          } else {
            output = userFunction(input[0]);
          }
        } else {
          output = userFunction(input);
        }

        console.log('Output:', output);

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
        setResult('Some tests failed. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      setResult(`There was an error in your code: ${(error as Error).message}`);
      setIsSuccess(false);
    }
  };

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
        <p>
          <strong>Example:</strong> {task.example}
        </p>
      </div>
      <textarea
        className="code-textarea"
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
      />
      <button className="run-button" onClick={runCode}>
        Run
      </button>
      <div className={`result-message ${isSuccess ? 'success' : 'failure'}`}>{result}</div>
    </div>
  );
};

import React, { useState } from 'react';
import './EveryPage.css';

const EveryPage: React.FC = () => {
    const [userCode, setUserCode] = useState<string>(`function checkAllGreaterThanTen(arr) {
    // Your code here
    return;
}`);
    const [result, setResult] = useState<string>('');

    const runCode = () => {
        try {
            // Evaluate user code as a function
            const userFunction = new Function('return ' + userCode)();

            // Test cases
            const test1 = userFunction([11, 12, 15, 20]) === true;
            const test2 = userFunction([5, 12, 15]) === false;

            // Check results
            if (test1 && test2) {
                setResult('All tests passed! Great job!');
                (document.getElementById('every-page-result') as HTMLElement).style.color = 'green';
            } else {
                setResult('Some tests failed. Please try again.');
                (document.getElementById('every-page-result') as HTMLElement).style.color = 'red';
            }
        } catch (error) {
            setResult(`There was an error in your code: ${(error as Error).message}`);
            (document.getElementById('every-page-result') as HTMLElement).style.color = 'red';
        }
    };

    return (
        <div className="every-page-container">
            <div className="every-page-description">
                <p>Your task is to write a function that checks if all elements in an array are greater than 10. Use the JavaScript <code>every</code> method to accomplish this.</p>
                <p><strong>Example:</strong> For the input <code>[11, 12, 15, 20]</code>, the result should be <code>true</code>. For <code>[5, 12, 15]</code>, the result should be <code>false</code>.</p>
            </div>
            <textarea
                className="every-page-textarea"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
            />
            <button className="every-page-button" onClick={runCode}>Run</button>
            <div id="every-page-result" className="every-page-result">{result}</div>
        </div>
    );
};

export default EveryPage;

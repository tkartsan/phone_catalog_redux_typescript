import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import textsData from '../../texts.json';

interface Content {
    id: string;
    label: string;
}

export const TheoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [contents, setContents] = useState<Content[]>([]);

    useEffect(() => {
        const contentArray: Content[] = Object.entries(textsData).map(([id, content]) => ({
            id,
            label: content.title ? content.title : "Theory Section"  
        }));
        setContents(contentArray);
    }, []);

    return (
        <div className='flex flex-col items-center text-2xl font-semibold'>
            <h1 className="text-3xl font-semibold mb-6">Practice Theory</h1>
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                {contents.map((content) => (
                    <button
                        key={content.id}
                        className="p-4 border border-gray-300 rounded hover:bg-gray-200 border-solid border-bgColorGrey"
                        onClick={() => navigate(`/theory/${content.id}`)}
                    >
                        {content.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
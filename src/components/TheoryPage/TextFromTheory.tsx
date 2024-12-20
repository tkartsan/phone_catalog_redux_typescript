import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import textsData from '../../texts.json';

export const TextFromTheory: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        if (topicId && textsData[topicId]?.text) {
            setContent(textsData[topicId].text);
        } else {
            setContent('<p>Content not available.</p>'); 
        }
    }, [topicId]);

    return (
        <div className='flex flex-col items-center text-2xl font-semibold'>
            <h1 className="text-3xl font-semibold mb-6">
                {topicId && textsData[topicId]?.title || "Practice Theory"}
            </h1>
            <div className="w-full max-w-[1136px]">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

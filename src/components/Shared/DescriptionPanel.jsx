import React from 'react';

export const DescriptionPanel = ({ title = 'About', description }) => {
  if (!description) return null;

  return (
    <div className="w-[559px]">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="h-[1px] bg-gray-300 w-full mb-6"></div>
      {description.map((section, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
          <div className="text-base text-gray-700 leading-6">
            {section.text.map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

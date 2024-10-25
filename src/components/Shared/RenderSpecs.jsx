import React from 'react';

export const RenderSpecs = ({ item, itemType }) => {
  const specs = {
    phone: [
      { label: 'Screen', value: item.screen },
      { label: 'Resolution', value: item.resolution },
      { label: 'Processor', value: item.processor },
      { label: 'RAM', value: item.ram },
      { label: 'Built in memory', value: item.capacity },
      { label: 'Camera', value: item.camera },
      { label: 'Zoom', value: item.zoom },
      { label: 'Cell', value: item.cell?.join(', ') },
    ],
    tablet: [
      { label: 'Screen', value: item.screen },
      { label: 'Resolution', value: item.resolution },
      { label: 'Processor', value: item.processor },
      { label: 'RAM', value: item.ram },
      { label: 'Built-in memory', value: item.capacity },
      { label: 'Camera', value: item.camera },
      { label: 'Zoom', value: item.zoom },
      { label: 'Cell', value: item.cell?.join(', ') },
    ],
    accessory: [
      { label: 'Screen', value: item.screen },
      { label: 'Resolution', value: item.resolution },
      { label: 'Processor', value: item.processor },
      { label: 'RAM', value: item.ram },
      { label: 'Cell', value: item.cell?.join(', ') },
    ],
  };

  return (
    <div className="w-[559px]">
      <h2 className="text-2xl font-bold mb-4">Tech specs</h2>
      <div className="h-[1px] bg-gray-300 w-full mb-6"></div>
      <div className="flex flex-col gap-4">
        {specs[itemType]?.map(
          (spec, index) =>
            spec.value && (
              <div className="flex justify-between" key={index}>
                <span className="text-gray-600">{spec.label}</span>
                <span className="text-black">{spec.value}</span>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

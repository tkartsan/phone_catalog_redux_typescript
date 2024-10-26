import React from 'react';
export const RenderSpecs = ({ item, itemType }) => {
    var _a, _b, _c, _d;
    const specs = {
        phone: [
            { label: 'Screen', value: item.screen },
            { label: 'Resolution', value: item.resolution },
            { label: 'Processor', value: item.processor },
            { label: 'RAM', value: item.ram },
            { label: 'Built-in memory', value: item.capacity },
            { label: 'Camera', value: item.camera },
            { label: 'Zoom', value: item.zoom },
            { label: 'Cell', value: (_a = item.cell) === null || _a === void 0 ? void 0 : _a.join(', ') },
        ],
        tablet: [
            { label: 'Screen', value: item.screen },
            { label: 'Resolution', value: item.resolution },
            { label: 'Processor', value: item.processor },
            { label: 'RAM', value: item.ram },
            { label: 'Built-in memory', value: item.capacity },
            { label: 'Camera', value: item.camera },
            { label: 'Zoom', value: item.zoom },
            { label: 'Cell', value: (_b = item.cell) === null || _b === void 0 ? void 0 : _b.join(', ') },
        ],
        accessory: [
            { label: 'Screen', value: item.screen },
            { label: 'Resolution', value: item.resolution },
            { label: 'Processor', value: item.processor },
            { label: 'RAM', value: item.ram },
            { label: 'Cell', value: (_c = item.cell) === null || _c === void 0 ? void 0 : _c.join(', ') },
        ],
    };
    return (<div className="w-[559px]">
      <h2 className="text-2xl font-bold mb-4">Tech specs</h2>
      <div className="h-[1px] bg-gray-300 w-full mb-6"></div>
      <div className="flex flex-col gap-4">
        {(_d = specs[itemType]) === null || _d === void 0 ? void 0 : _d.map((spec, index) => spec.value && (<div className="flex justify-between" key={index}>
                <span className="text-gray-600">{spec.label}</span>
                <span className="text-black">{spec.value}</span>
              </div>))}
      </div>
    </div>);
};

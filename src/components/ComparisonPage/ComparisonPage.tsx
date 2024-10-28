import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Product } from 'types/global';

export const ComparisonPage: React.FC = () => {
  const { comparedDevices } = useSelector((state: RootState) => state.compare);
  const [hideIdenticalLines, setHideIdenticalLines] = useState(false);

  if (comparedDevices.length === 0) {
    return <p>No devices to compare.</p>;
  }

  const specs = [
    { label: 'Screen', key: 'screen' },
    { label: 'Processor', key: 'processor' },
    { label: 'Resolution', key: 'resolution' },
    { label: 'RAM', key: 'ram' },
    { label: 'Cell', key: 'cell' },
    { label: 'Price', key: 'priceDiscount' },
  ] as const;

  const areValuesIdentical = (key: keyof Product) => {
    const firstValue = comparedDevices[0][key];

    return comparedDevices.every((device) => {
      if (Array.isArray(firstValue)) {
        return (
          Array.isArray(device[key]) &&
          firstValue.length === device[key].length &&
          firstValue.every((val, index) => val === (device[key] as string[])[index])
        );
      }

      return device[key] === firstValue;
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 border-solid border-1 border-colorBorderGrey">
      <h1 className="text-2xl font-bold mb-6">Device Comparison</h1>

      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={hideIdenticalLines}
            onChange={() => setHideIdenticalLines(!hideIdenticalLines)}
          />
          <span className="ml-2">Hide same parameters</span>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4 border-b border-gray-300">
        <div className="col-span-1"></div>
        {comparedDevices.map((device, index) => (
          <div
            key={index}
            className="flex flex-col justify-center p-4 border-l border-gray-300"
          >
            <img
              src={`/${device.images ? device.images[0] : ''}`}
              alt={device.name}
              className="h-[200px] object-contain mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{device.name}</h2>
          </div>
        ))}
      </div>

      <div className="h-[1px] w-full bg-colorBorderGrey mb-2"></div>

      <div className="grid grid-cols-3 gap-x-4 gap-y-0 mt-4 border-t border-gray-300">
        {specs.map((spec, index) => {
          if (hideIdenticalLines && areValuesIdentical(spec.key)) {
            return null;
          }

          return (
            <React.Fragment key={spec.key}>
              <div
                className={`p-4 font-semibold border-t border-gray-300 border-r ${
                  index % 2 === 0 ? 'bg-gray-100' : ''
                } ${spec.key === 'cell' ? 'flex items-center' : ''}`}
              >
                {spec.label}
              </div>

              {comparedDevices.map((device, i) => (
                <div
                  key={i}
                  className={`p-4 text-center border-l border-t border-gray-300 ${
                    index % 2 === 0 ? 'bg-gray-100' : ''
                  }`}
                >
                  {Array.isArray(device[spec.key])
                    ? (device[spec.key] as string[]).join(', ')
                    : device[spec.key]}
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

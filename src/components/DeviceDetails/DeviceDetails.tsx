import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon } from '../../assets';
import { DescriptionPanel } from '../Shared/DescriptionPanel';
import { DeviceSlider } from '../Shared/DeviceSlider';
import { PurchasePanel } from '../Shared/PurchasePanel';
import { RenderSpecs } from '../Shared/RenderSpecs';
import { Breadcrumb } from '../Breadcrumb';

import { Product } from 'types/global';

interface DeviceDetailsProps {
  items: Product[];
  itemType: 'phones' | 'tablets' | 'accessories';
}

export const DeviceDetails: React.FC<DeviceDetailsProps> = ({ items, itemType }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const device = id && items?.find((item) => item.id.toString() === id);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedCapacity, setSelectedCapacity] = useState<string | undefined>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  useEffect(() => {
    if (device) {
      setSelectedColor(device.color);
      setSelectedCapacity(device.capacity);
      setSelectedImage(device.images[0]);
    }
  }, [device]);

  if (!items.length) {
    return null;
  }

  if (!device) {
    return <p>{itemType.charAt(0).toUpperCase() + itemType.slice(1)} not found</p>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const newDeviceId = items.find(
      (item) =>
        item.namespaceId === device.namespaceId &&
        item.color === color &&
        item.capacity === selectedCapacity,
    )?.id;

    if (newDeviceId) {
      navigate(`/${itemType}/${newDeviceId}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);
    const newDeviceId = items.find(
      (item) =>
        item.namespaceId === device.namespaceId &&
        item.color === selectedColor &&
        item.capacity === capacity,
    )?.id;

    if (newDeviceId) {
      navigate(`/${itemType}/${newDeviceId}`);
    }
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-[1136px] gap-6 py-4">
        <div className="flex flex-col gap-2">
          <Breadcrumb />
          <div
            className="flex items-center gap-2 cursor-pointer text-gray-600"
            onClick={handleBackClick}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="text-lg">Back</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-6">{device.name}</h1>
        <div className="flex justify-between">
          <div className="flex flex-col justify-start items-start gap-4">
            {device.images.map((image, index) => (
              <div
                key={index}
                className={`w-[78px] h-[78px] cursor-pointer border-solid ${
                  selectedImage === image
                    ? 'border-colorGrey'
                    : 'border-colorLightGrey'
                }`}
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={`/${image}`}
                  alt={device.name}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <img
              src={`/${selectedImage}`}
              alt={device.name}
              className="h-[464px] object-contain"
            />
          </div>
          <PurchasePanel
            item={device}
            itemType={itemType}
            selectedColor={selectedColor || ''}
            selectedCapacity={selectedCapacity || ''}
            handleColorChange={handleColorChange}
            handleCapacityChange={handleCapacityChange}
          />
        </div>
        <div className="flex gap-10 mt-6">
          <DescriptionPanel description={device.description} />
          <RenderSpecs item={device} itemType={itemType} />
        </div>
        {!!items.length ? (
          <div className="mt-8">
            <DeviceSlider
              items={items.slice(0, 10)}
              title="You may also like"
              itemType={itemType}
              isShowDiscount={true}
              sliderId={`${itemType}-slider`}
            />
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

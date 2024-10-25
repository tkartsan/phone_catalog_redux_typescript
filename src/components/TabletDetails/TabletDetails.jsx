import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon } from '../../assets';
import { DescriptionPanel } from '../Shared/DescriptionPanel';
import { DeviceSlider } from '../Shared/DeviceSlider';
import { RenderSpecs } from '../Shared/RenderSpecs';

import { Breadcrumb } from './../Breadcrumb';
import { PurchasePanel } from './../Shared/PurchasePanel';

export const TabletDetails = ({ tablets }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const tablet = tablets?.find((t) => t.id === id);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedCapacity, setSelectedCapacity] = useState();
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (tablet) {
      setSelectedColor(tablet.color);
      setSelectedCapacity(tablet.capacity);
      setSelectedImage(tablet.images[0]);
    }
  }, [tablet]);

  if (!tablets.length) {
    return null;
  }

  if (!tablet) {
    return <p>Tablet not found</p>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const newTabletId = tablets.find(
      (t) =>
        t.namespaceId === tablet.namespaceId &&
        t.color === color &&
        t.capacity === selectedCapacity,
    )?.id;

    if (newTabletId) {
      navigate(`/tablets/${newTabletId}`);
    }
  };

  const handleCapacityChange = (capacity) => {
    setSelectedCapacity(capacity);
    const newTabletId = tablets.find(
      (t) =>
        t.namespaceId === tablet.namespaceId &&
        t.color === selectedColor &&
        t.capacity === capacity,
    )?.id;

    if (newTabletId) {
      navigate(`/tablets/${newTabletId}`);
    }
  };

  const handleImageClick = (image) => {
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
        <h1 className="text-3xl font-bold mb-6">{tablet.name}</h1>
        <div className="flex justify-between">
          <div className="flex flex-col justify-start items-start gap-4">
            {tablet.images.map((image, index) => (
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
                  alt={tablet.name}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <img
              src={`/${selectedImage}`}
              alt={tablet.name}
              className="h-[464px] object-contain"
            />
          </div>
          <PurchasePanel
            item={tablet}
            itemType="tablet"
            selectedColor={selectedColor}
            selectedCapacity={selectedCapacity}
            handleColorChange={handleColorChange}
            handleCapacityChange={handleCapacityChange}
          />
        </div>
        <div className="flex gap-10 mt-6">
          <DescriptionPanel description={tablet.description} />
          <RenderSpecs item={tablet} itemType="tablet" />
        </div>
        {!!tablets.length ? (
          <div className="mt-8">
            <DeviceSlider
              items={tablets.slice(0, 10)}
              title="You may also like"
              itemType="tablets"
              isShowDiscount={true}
              sliderId="tablets-slider"
            />
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

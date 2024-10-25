import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon } from '../../assets';
import { DescriptionPanel } from '../Shared/DescriptionPanel';
import { DeviceSlider } from '../Shared/DeviceSlider';
import { PurchasePanel } from '../Shared/PurchasePanel';
import { RenderSpecs } from '../Shared/RenderSpecs';

import { Breadcrumb } from './../Breadcrumb';

export const PhoneDetails = ({ phones }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const phone = phones?.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedCapacity, setSelectedCapacity] = useState();
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (phone) {
      setSelectedColor(phone.color);
      setSelectedCapacity(phone.capacity);
      setSelectedImage(phone.images[0]);
    }
  }, [phone]);

  if (!phones.length) {
    return null;
  }

  if (!phone) {
    return <p>Phone not found</p>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const newPhoneId = phones.find(
      (p) =>
        p.namespaceId === phone.namespaceId &&
        p.color === color &&
        p.capacity === selectedCapacity,
    )?.id;

    if (newPhoneId) {
      navigate(`/phones/${newPhoneId}`);
    }
  };

  const handleCapacityChange = (capacity) => {
    setSelectedCapacity(capacity);
    const newPhoneId = phones.find(
      (p) =>
        p.namespaceId === phone.namespaceId &&
        p.color === selectedColor &&
        p.capacity === capacity,
    )?.id;

    if (newPhoneId) {
      navigate(`/phones/${newPhoneId}`);
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
            <span className="text-colorGrey hover:text-colorBlack">Back</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-6">{phone.name}</h1>
        <div className="flex justify-between">
          <div className="flex flex-col justify-start items-start gap-4">
            {phone.images.map((image, index) => (
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
                  alt={phone.name}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <img
              src={`/${selectedImage}`}
              alt={phone.name}
              className="h-[464px] object-contain"
            />
          </div>
          <PurchasePanel
            item={phone}
            itemType="phone"
            selectedColor={selectedColor}
            selectedCapacity={selectedCapacity}
            handleColorChange={handleColorChange}
            handleCapacityChange={handleCapacityChange}
          />
        </div>
        <div className="flex gap-10 mt-6">
          <DescriptionPanel description={phone.description} />
          <RenderSpecs item={phone} itemType="phone" />
        </div>
        {!!phones.length ? (
          <div className="mt-8">
            <DeviceSlider
              items={phones.slice(0, 10)}
              title="You may also like"
              itemType="phones"
              isShowDiscount={true}
              sliderId="phones-slider"
            />
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

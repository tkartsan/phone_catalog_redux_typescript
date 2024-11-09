import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { devicesColorNamesMap } from '../../global/constants';
import { addToCart, removeFromCart } from '../../store/cartSlice';
import { addDeviceToCompare, DeviceType } from '../../store/compareSlice';
import { CompareModal } from '../CompareModal';
import { RootState } from '../../store/store';
import { Product } from 'types/global';

interface PurchasePanelProps {
  item: Product;
  itemType: 'phones' | 'tablets' | 'accessories';
  selectedColor: string;
  handleColorChange: (color: string) => void;
  selectedCapacity: string;
  handleCapacityChange: (capacity: string) => void;
}

export const PurchasePanel: React.FC<PurchasePanelProps> = ({
  item,
  itemType,
  selectedColor,
  handleColorChange,
  selectedCapacity,
  handleCapacityChange,
}) => {
  const dispatch = useDispatch();
  const { comparedDevices } = useSelector((state: RootState) => state.compare);
  const { cart } = useSelector((state: RootState) => state.cart);
  const isInCartState = cart.some((cartItem) => cartItem.id === item.id); // Check if item is in cart
  const [isCompareModalOpen, setCompareModalOpen] = useState(false);

  useEffect(() => {
    if (comparedDevices.length > 0) {
      setCompareModalOpen(true);
    }
  }, [comparedDevices]);

  const handleCartAction = () => {
    if (isInCartState) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(addToCart(item));
    }
  };

  const handleCompareClick = () => {
    dispatch(addDeviceToCompare({ device: item, deviceType: itemType }));
  };

  // Disable "Compare" button if the device is in the cart
  const isCompareDisabled = isInCartState || comparedDevices.length >= 2;

  return (
    <div className="flex flex-col w-[400px] space-y-4 relative">
      <p className="text-right text-sm text-gray-500">ID: {item.numericId}</p>

      <div className="space-y-2">
        <p className="text-lg">Available colors</p>
        <div className="flex space-x-4">
          {item.colorsAvailable.map((color, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded-full border-2 border-solid ${
                selectedColor === color ? 'border-black' : 'border-gray-300'
              }`}
              style={{
                backgroundColor: devicesColorNamesMap[color] || '#000000',
              }}
              onClick={() => handleColorChange(color)}
            ></button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-lg">Select capacity</p>
        <div className="flex space-x-4">
          {item.capacityAvailable.map((capacity, index) => (
            <button
              key={index}
              className={`px-4 py-2 border border-solid text-sm ${
                selectedCapacity === capacity
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 text-black'
              }`}
              onClick={() => handleCapacityChange(capacity)}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-4">
          <p className="text-3xl font-bold">${item.priceDiscount}</p>
          <p className="text-lg text-gray-500 line-through">
            ${item.priceRegular}
          </p>
        </div>
      </div>

      <button
        className={`h-[46px] px-4 py-3 transition duration-300 ${
          isInCartState
            ? 'bg-white text-green-500 border-colorLightGrey border-solid'
            : 'bg-black text-white'
        }`}
        onClick={handleCartAction}
      >
        {isInCartState ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        className={`w-[150px] h-[46px] text-white transition duration-300 ${
          isCompareDisabled ? 'bg-colorLightGrey cursor-not-allowed' : 'bg-black'
        }`}
        onClick={handleCompareClick}
        disabled={isCompareDisabled}
      >
        Compare
      </button>

      {isCompareModalOpen && (
        <CompareModal closeModal={() => setCompareModalOpen(false)} />
      )}

      <div className="flex flex-col space-y-2 mt-4">
        {item.screen && (
          <div className="flex justify-between">
            <span className="text-gray-600">Screen</span>
            <span className="text-black">{item.screen}</span>
          </div>
        )}
        {item.resolution && (
          <div className="flex justify-between">
            <span className="text-gray-600">Resolution</span>
            <span className="text-black">{item.resolution}</span>
          </div>
        )}
        {item.processor && (
          <div className="flex justify-between">
            <span className="text-gray-600">Processor</span>
            <span className="text-black">{item.processor}</span>
          </div>
        )}
        {item.ram && (
          <div className="flex justify-between">
            <span className="text-gray-600">RAM</span>
            <span className="text-black">{item.ram}</span>
          </div>
        )}
        {item.cell && (
          <div className="flex justify-between">
            <span className="text-gray-600">Cell</span>
            <span className="text-black">{item.cell.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

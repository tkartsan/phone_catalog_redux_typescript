import React, { useState } from 'react';
import { Breadcrumb } from '../Breadcrumb';
import { CustomDropdown } from '../CustomDropdown';
import { Pagination } from '../Pagination';
import { DeviceCard } from '../Shared/DeviceCard';
import { Product } from 'types/global';
import './DeviceList.css';

interface DeviceListProps {
  devices: Product[] | null;
  itemType: string;
}

export const DeviceList: React.FC<DeviceListProps> = ({ devices, itemType }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [sortOption, setSortOption] = useState<string>('');

  const sortOptions = [
    { value: '', label: 'Default sorting' },
    { value: 'lowestPrice', label: 'Lowest price first' },
    { value: 'highestPrice', label: 'Highest price first' },
    { value: 'biggestDiscount', label: 'Biggest discount' },
  ];

  const itemsPerPageOptions = [
    { value: 12, label: '12' },
    { value: 16, label: '16' },
    { value: 24, label: '24' },
    { value: 48, label: '48' },
    { value: 'ALL', label: 'ALL' },
  ];

  if (!devices) {
    return null;
  }

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const sortedDevices = [...devices].sort((a, b) => {
    switch (sortOption) {
      case 'lowestPrice':
        return a.priceRegular - b.priceRegular;
      case 'highestPrice':
        return b.priceRegular - a.priceRegular;
      case 'biggestDiscount':
        return (
          (b.priceRegular - (b.priceDiscount ?? b.priceRegular)) -
          (a.priceRegular - (a.priceDiscount ?? a.priceRegular))
        );
      default:
        return 0;
    }
  });

  const deviceCount = sortedDevices.length;
  const totalPages = itemsPerPage === devices.length ? 1 : Math.ceil(deviceCount / itemsPerPage);

  const indexOfLastDevice = (currentPage + 1) * itemsPerPage;
  const indexOfFirstDevice = indexOfLastDevice - itemsPerPage;
  const currentDevices = sortedDevices.slice(indexOfFirstDevice, indexOfLastDevice);

  return (
    <div className="container">
      <Breadcrumb />
      <div className="title">{itemType.charAt(0).toUpperCase() + itemType.slice(1)}</div>
      <p className="subtitle">{deviceCount} models</p>

      <div className="flex gap-6 mb-8">
        <CustomDropdown
          options={sortOptions}
          selectedOption={sortOptions.find((opt) => opt.value === sortOption) || null}
          setSelectedOption={(option) => setSortOption(option.value.toString())}
          label="Sort by"
          isNarrowWidth={false}
          heightClass="40px"
        />
        <CustomDropdown
          options={itemsPerPageOptions}
          selectedOption={
            itemsPerPageOptions.find((opt) => opt.value === itemsPerPage || opt.value === 'ALL') || null
          }
          setSelectedOption={(option) =>
            setItemsPerPage(option.value === 'ALL' ? devices.length : Number(option.value))
          }
          label="Items on page"
          isNarrowWidth={true}
          heightClass="40px"
        />
      </div>

      <div className="device-grid">
        {currentDevices.map((device) => (
          <DeviceCard
            key={device.id}
            item={device}
            isShowDiscount={true}
            linkUrl={`/${itemType}/${device.id}`}
          />
        ))}
      </div>

      <Pagination
        devices={devices}
        devicesPerPage={itemsPerPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

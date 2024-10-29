import './Accessories.css';

import React, { useState } from 'react';
import { Breadcrumb } from '../Breadcrumb';
import { CustomDropdown } from '../CustomDropdown';
import { Pagination } from '../Pagination';
import { DeviceCard } from '../Shared/DeviceCard';
import { Product } from 'types/global';

interface AccessoriesProps {
  accessories: Product[] | null;
}

export const Accessories: React.FC<AccessoriesProps> = ({ accessories }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [accessoriesPerPage, setAccessoriesPerPage] = useState<number>(16);
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

  if (!accessories) {
    return null;
  }

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const sortedAccessories = [...accessories].sort((a, b) => {
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

  const accessoryCount = sortedAccessories.length;
  const totalPages =
    accessoriesPerPage === accessories.length
      ? 1
      : Math.ceil(accessoryCount / accessoriesPerPage);

  const indexOfLastAccessory = (currentPage + 1) * accessoriesPerPage;
  const indexOfFirstAccessory = indexOfLastAccessory - accessoriesPerPage;
  const currentAccessories = sortedAccessories.slice(
    indexOfFirstAccessory,
    indexOfLastAccessory
  );

  return (
    <div className="container">
      <Breadcrumb />
      <div className="title">Accessories</div>
      <p className="subtitle">{accessoryCount} models</p>
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
          selectedOption={itemsPerPageOptions.find(
            (opt) => opt.value === accessoriesPerPage || opt.value === 'ALL'
          ) || null}
          setSelectedOption={(option) =>
            setAccessoriesPerPage(
              option.value === 'ALL' ? accessories.length : Number(option.value)
            )
          }
          label="Items on page"
          isNarrowWidth={true}
          heightClass="40px"
        />
      </div>

      <div className="accessory-grid">
        {currentAccessories.map((accessory) => (
          <DeviceCard
            key={accessory.id}
            item={accessory}
            itemType="accessories"
            isShowDiscount={true}
          />
        ))}
      </div>

      <Pagination
        devices={accessories}
        devicesPerPage={accessoriesPerPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

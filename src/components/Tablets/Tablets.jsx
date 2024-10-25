import './Tablets.css';

import React, { useState } from 'react';

import { Breadcrumb } from '../Breadcrumb';
import { CustomDropdown } from '../CustomDropdown';
import { Pagination } from '../Pagination';
import { DeviceCard } from '../Shared/DeviceCard';

export const Tablets = ({ tablets }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [tabletsPerPage, setTabletsPerPage] = useState(16);
  const [sortOption, setSortOption] = useState('');

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

  if (!tablets) {
    return null;
  }

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  const sortedTablets = [...tablets].sort((a, b) => {
    switch (sortOption) {
      case 'lowestPrice':
        return a.priceRegular - b.priceRegular;
      case 'highestPrice':
        return b.priceRegular - a.priceRegular;
      case 'biggestDiscount':
        return (
          b.priceRegular - b.priceDiscount - (a.priceRegular - a.priceDiscount)
        );
      default:
        return 0;
    }
  });

  const tabletCount = sortedTablets.length;
  const totalPages =
    tabletsPerPage === tablets.length
      ? 1
      : Math.ceil(tabletCount / tabletsPerPage);

  const indexOfLastTablet = (currentPage + 1) * tabletsPerPage;
  const indexOfFirstTablet = indexOfLastTablet - tabletsPerPage;
  const currentTablets = sortedTablets.slice(
    indexOfFirstTablet,
    indexOfLastTablet,
  );

  return (
    <div className="container">
      <Breadcrumb />
      <div className="title">Tablets</div>
      <p className="subtitle">{tabletCount} models</p>

      <div className="flex gap-6 mb-8">
        <CustomDropdown
          options={sortOptions}
          selectedOption={sortOptions.find((opt) => opt.value === sortOption)}
          setSelectedOption={(option) => setSortOption(option.value)}
          label="Sort by"
          isNarrowWidth={false}
          heightClass="40px"
        />

        <CustomDropdown
          options={itemsPerPageOptions}
          selectedOption={itemsPerPageOptions.find(
            (opt) => opt.value === tabletsPerPage || opt.value === 'ALL',
          )}
          setSelectedOption={(option) =>
            setTabletsPerPage(
              option.value === 'ALL' ? tablets.length : option.value,
            )
          }
          label="Items on page"
          isNarrowWidth={true}
          heightClass="40px"
        />
      </div>

      <div className="tablet-grid">
        {currentTablets.map((tablet) => (
          <DeviceCard
            key={tablet.id}
            item={tablet}
            itemType="tablets"
            isShowDiscount={true}
          />
        ))}
      </div>

      <Pagination
        devices={tablets}
        devicesPerPage={tabletsPerPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

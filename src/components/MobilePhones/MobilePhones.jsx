import './MobilePhones.css';

import React, { useState } from 'react';

import { Breadcrumb } from '../Breadcrumb';
import { CustomDropdown } from '../CustomDropdown';
import { Pagination } from '../Pagination';
import { DeviceCard } from '../Shared/DeviceCard';

export const MobilePhones = ({ phones }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [phonesPerPage, setPhonesPerPage] = useState(16);
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

  if (!phones) {
    return null;
  }

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  const sortedPhones = [...phones].sort((a, b) => {
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

  const phoneCount = sortedPhones.length;
  const totalPages =
    phonesPerPage === phones.length ? 1 : Math.ceil(phoneCount / phonesPerPage);

  const indexOfLastPhone = (currentPage + 1) * phonesPerPage;
  const indexOfFirstPhone = indexOfLastPhone - phonesPerPage;
  const currentPhones = sortedPhones.slice(indexOfFirstPhone, indexOfLastPhone);

  return (
    <div className="container">
      <Breadcrumb />
      <div className="title">Mobile Phones</div>
      <p className="subtitle">{phoneCount} models</p>

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
            (opt) => opt.value === phonesPerPage || opt.value === 'ALL',
          )}
          setSelectedOption={(option) =>
            setPhonesPerPage(
              option.value === 'ALL' ? phones.length : option.value,
            )
          }
          label="Items on page"
          isNarrowWidth={true}
          heightClass="40px"
        />
      </div>

      <div className="phone-grid">
        {currentPhones.map((phone) => (
          <DeviceCard
            key={phone.id}
            item={phone}
            itemType="phones"
            isShowDiscount={true}
          />
        ))}
      </div>

      <Pagination
        devices={phones}
        devicesPerPage={phonesPerPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

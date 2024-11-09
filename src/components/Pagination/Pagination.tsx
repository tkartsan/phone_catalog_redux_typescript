import './Pagination.css';

import React from 'react';
import ReactPaginate from 'react-paginate';

interface Device {
  id: number;
  name: string;
}

interface PaginationProps {
  devices: Device[]; 
  devicesPerPage: number;
  totalPages: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  devices,
  devicesPerPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    devicesPerPage !== devices.length && (
      <div className="pagination-container">
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel=""
          pageCount={totalPages}
          marginPagesDisplayed={0}
          pageRangeDisplayed={totalPages}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active-page"
          pageClassName="page"
          pageLinkClassName="page-link"
          previousClassName="page-prev"
          nextClassName="page-next"
          disabledClassName="disabled"
          breakClassName="hidden"
        />
      </div>
    )
  );
};

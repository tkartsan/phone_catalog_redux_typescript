import './Pagination.css';

import React from 'react';
import ReactPaginate from 'react-paginate';

export const Pagination = ({
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

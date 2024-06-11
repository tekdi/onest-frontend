import React from "react";

const Pagination = ({ limit, page, totalRows, onPageChange }) => {
  const totalPages = Math.ceil(totalRows / limit);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (page <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (page + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = page - 5;
        endPage = page + 4;
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={page === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div
      className="pagination"
      style={{ display: `${limit <= totalRows ? "block" : "none"}` }}
    >
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

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

    if (totalPages <= 10) {
      // Display all pages if total pages are less than or equal to 10
      for (let i = 1; i <= totalPages; i++) {
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
    } else {
      // Display first 4 pages, "..." and last 4 pages
      for (let i = 1; i <= 4; i++) {
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

      // Display "..." between first 4 and last 4 pages
      pageNumbers.push(<span key="ellipsis1">...</span>);

      for (let i = totalPages - 3; i <= totalPages; i++) {
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
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(1)} disabled={page === 1}>
        {"<<"}
      </button>
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        {"<"}
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        {">"}
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={page === totalPages}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;

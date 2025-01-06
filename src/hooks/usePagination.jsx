import { useState } from "react";

const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return { currentPage, totalPages, paginatedData, handlePageChange };
};

export default usePagination;

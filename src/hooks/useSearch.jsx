import { useState } from "react";

const useSearch = (data) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return { searchQuery, filteredData, handleSearch };
};

export default useSearch;

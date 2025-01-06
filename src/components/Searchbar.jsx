import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <span className="search-icon">
        <FaSearch />
      </span>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Searchbar;

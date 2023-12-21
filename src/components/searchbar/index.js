// SearchBar.js

import React, { useState } from "react";
import "./searchbar.css"; // Import CSS
import { RiSearchLine } from "react-icons/ri";
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="searchBarForm" onSubmit={handleSearchSubmit}>
      <input
        className="searchInput"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="searchButton" type="submit">
        <RiSearchLine />
      </button>
    </form>
  );
};

export default SearchBar;

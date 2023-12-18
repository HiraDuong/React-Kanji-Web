import React, { useState, useEffect } from 'react';
import APIpath from '../../config/APIpath';
import './SearchCourse.css';

const SearchCourse = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(true);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${APIpath}courses/search?searchTerm=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSearchResults(data);
      onSearchResults(data);
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    setIsSearchFocused(false);
    handleSearch();
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Chỉ thực hiện tìm kiếm nếu ô tìm kiếm đang được focus
    if (isSearchFocused) {
      handleSearch();
    }
  }, [searchTerm, isSearchFocused]);

  return (
    <div>
      <input
        id="search-container"
        type="text"
        placeholder="Nhập tên khóa học"
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default SearchCourse;

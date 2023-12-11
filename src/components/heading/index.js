import React from 'react';
import './heading.css';
import SearchBar from '../searchbar';
//import SearchBar from './search';
function Heading() {
  const handleSearch = (searchTerm) => {
    // Xử lý tìm kiếm // gọi API các thứ
    console.log('Searching for:', searchTerm);
  };
  return (
    <div className="navBar">
      <div className="navBarChild">
      <b className="card">KANJI CARD</b>
      </div>
      <div className="searchBarContainer">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
}

export default Heading;

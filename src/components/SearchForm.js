// components/SearchForm.js
import React, { useState } from 'react';

function SearchForm({ onSearch }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (inputValue.trim()) {
        onSearch(inputValue);  // Pass the initial message to ChatInterface
        setInputValue('');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        <button type="submit" className="search-button">بحث</button>
      </form>
    );
}

export default SearchForm;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  SearcHeader,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

const Searchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    //записати значення запиту в локальний стейт
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    //перевірити запит на пустоту
    if (searchQuery.trim() === '') {
      return alert('Enter query');
    }
    //передати значення запиту через пропси в апп
    onSearch(searchQuery);

    //очистити форму від старого запиту
    setSearchQuery('');
  };

  return (
    <SearcHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          {/* <span>Search</span> */}
          <span>
            <svg
              class="svg-icon search-icon"
              aria-labelledby="title desc"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 19.9 19.7"
            >
              <title id="title">Search Icon</title>
              <desc id="desc">A magnifying glass icon.</desc>
              <g class="search-path" fill="none" stroke="#848F91">
                <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
                <circle cx="8" cy="8" r="7" />
              </g>
            </svg>
          </span>
        </SearchButton>

        <SearchInput
          type="text"
          name="searchQuery"
          value={searchQuery}
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearcHeader>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
};

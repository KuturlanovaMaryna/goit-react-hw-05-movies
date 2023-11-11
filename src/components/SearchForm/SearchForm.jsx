import React from 'react';
import css from './SearchForm.module.css';

import { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const onChange = event => {
    setInput(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(input.toLowerCase());
  };

  return (
    <form className={css.searchbar} onSubmit={handleSubmit}>
      <input
        name="input"
        onChange={onChange}
        className={css.searchInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />
      <button type="submit" className={css.searchBtn}>
        <span className={css.buttonName}>Search</span>
      </button>
    </form>
  );
};

export default SearchForm;

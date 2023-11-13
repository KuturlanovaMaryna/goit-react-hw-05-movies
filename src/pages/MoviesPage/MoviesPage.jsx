import React from 'react';

import Loader from '../../components/Loader/Loader';
import { fetchMovieByName } from '../../services/themoviedb';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchFilms, setSearchFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const moviesListRef = useRef([]);
  const queryValue = searchParams.get('query');

  const onFormSubmit = e => {
    e.preventDefault();
    const value = e.currentTarget.elements.moviesName.value;
    setSearchParams({ query: value });
  };

  useEffect(() => {
    const SearchMovies = async () => {
      try {
        if (!queryValue) {
          return;
        }
        setLoading(true);

        const searchResults = await fetchMovieByName(queryValue);
        setSearchFilms(searchResults);
        moviesListRef.current = searchResults;
      } catch (error) {
        console.log('error: ', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    SearchMovies();
  }, [queryValue]);

  return (
    <div>
      <form onSubmit={onFormSubmit} className={css.form}>
        <label className={css.label}>
          <input
            name="moviesName"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            className={css.input}
          />
        </label>
        <button type="submit" className={css.btnSearch}>
          <span>Search</span>
        </button>
      </form>
      <div>
        {loading && <Loader />}
        {error !== null && (
          <p>There is no movies with this request. Please, try again</p>
        )}
        <ul className={css.moviesSearchList}>
          {searchFilms !== 0 &&
            searchFilms.map(film => {
              return (
                <li key={film.id} className={css.moviesSearchItem}>
                  <Link
                    state={{ from: location }}
                    to={`/movies/${film.id}`}
                    className={css.moviesSearchLink}
                  >
                    {film.title}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MoviesPage;

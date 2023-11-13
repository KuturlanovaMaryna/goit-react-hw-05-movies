import React from 'react';

import Loader from '../components/Loader/Loader';
import { fetchMovieByName } from '../services/themoviedb';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

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
      <form onSubmit={onFormSubmit}>
        <label className="label">
          <input
            name="moviesName"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
        </label>
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
      <div>
        {loading && <Loader />}
        {error !== null && (
          <p>There is no movies with this request. Please, try again</p>
        )}
        <ul>
          {searchFilms !== 0 &&
            searchFilms.map(film => {
              return (
                <li key={film.id}>
                  <Link state={{ from: location }} to={`/movies/${film.id}`}>
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

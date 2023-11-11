import React from 'react';
import Form from '../components/SearchForm/SearchForm';
import Loader from '../components/Loader/Loader';
import { fetchMovieByName } from '../services/themoviedb';
import { useState } from 'react';
import TrendingMoviesList from '../components/TrendingMoviesList/TrendingMoviesList';

const MoviesPage = () => {
  const [searchFilms, setSearchFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMovies, setNoMovies] = useState(false);

  const SearchMovies = input => {
    setLoading(true);
    fetchMovieByName(input)
      .then(searchResults => {
        setSearchFilms(searchResults);
        setNoMovies(searchResults.length === 0);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <Form onSubmit={SearchMovies} />
      {loading && <Loader />}
      {noMovies && (
        <p>There is no movies with this request. Please, try again</p>
      )}
      {searchFilms && <TrendingMoviesList films={searchFilms} />}
    </section>
  );
};

export default MoviesPage;

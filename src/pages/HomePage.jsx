import React from 'react';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from 'services/themoviedb';
import Loader from 'components/Loader/Loader';
import TrendingMoviesList from 'components/TrendingMoviesList/TrendingMoviesList';

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingFilms = () => {
      setLoading(true);

      fetchTrendingMovies()
        .then(trendingFilms => {
          setFilms(trendingFilms);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchTrendingFilms();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      <TrendingMoviesList films={films} />

      {loading && <Loader />}
    </main>
  );
};

export default HomePage;

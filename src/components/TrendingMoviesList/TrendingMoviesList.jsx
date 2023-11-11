import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from './TrandingMoviesList.module.css';

const TrendingMoviesList = ({ films }) => {
  const location = useLocation();

  return (
    <ul className={css.moviesList}>
      {films.map(film => (
        <li className={css.moviesItem} key={film.id}>
          <p className={css.moviesRaiting}>{film.vote_average}</p>
          <Link
            to={`/movies/${film.id}`}
            state={{ from: location }}
            className={css.moviesLink}
          >
            {film.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

TrendingMoviesList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};

export default TrendingMoviesList;

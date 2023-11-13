import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from 'services/themoviedb';
import Loader from 'components/Loader/Loader';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchMovieDetails = () => {
      setLoading(true);

      fetchMovieDetails(movieId)
        .then(movieDetails => {
          setMovieDetails(movieDetails);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    searchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return;
  }

  const {
    title,
    release_date,
    popularity,
    overview,
    genres,
    poster_path,
    original_title,
  } = movieDetails || {};

  return (
    <>
      <Link to={location.state?.from ?? '/'}>
        <button type="button" className={css.btnGB}>
          Go back
        </button>
      </Link>
      {loading && <Loader />}

      {movieDetails && (
        <div className={css.container}>
          <img
            className={css.poster}
            width="300px"
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
            }
            alt={original_title}
          />
          <div className={css.information}>
            <h1>
              {title} ({release_date.slice(0, 4)})
            </h1>
            <p>User score: {popularity}</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <ul>
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <hr />
      <div className={css.addInfoContainer}>
        <h3>Additional information</h3>
        <ul className={css.addInfoList}>
          <li>
            <Link to="cast" className={css.addInfo}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={css.addInfo}>
              Reviews
            </Link>
          </li>
        </ul>
        <hr />
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetails;

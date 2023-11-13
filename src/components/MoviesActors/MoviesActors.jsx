import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieActors } from 'services/themoviedb';
import Loader from 'components/Loader/Loader';
import css from './MoviesActors.module.css';

const MoviesActors = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onActorsOfMovie = () => {
      setLoading(true);

      fetchMovieActors(movieId)
        .then(actors => {
          setActors(actors);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    onActorsOfMovie();
  }, [movieId]);

  return (
    <div className={css.actorsContainer}>
      {loading && <Loader />}

      <ul className={css.actorsList}>
        {actors.map(({ id, profile_path, original_name, name, character }) => (
          <li key={id} className={css.actorContainer}>
            <img
              width="200px"
              height="300px"
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
              }
              alt={original_name}
            />
            <p>{name}</p>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MoviesActors;

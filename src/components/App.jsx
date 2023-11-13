import HomePage from 'pages/HomePage';
import MoviesPage from 'pages/MoviesPage';
import MovieDetails from '../pages/MovieDetails/MovieDetails';
import MoviesActors from './MoviesActors/MoviesActors';
import { NavLink, Route, Routes } from 'react-router-dom';
import MovieReviews from './MoviesReviews/MoviesReviews';

export const App = () => {
  return (
    <div>
      <header className="header">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/movies">
          Movies
        </NavLink>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<MoviesActors />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
      </Routes>
    </div>
  );
};

import { NavLink, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/movies" element={<div>Movies page</div>} />
        <Route path="/movies/:movieID" element={<div>Movie</div>} />
      </Routes>
    </div>
  );
};

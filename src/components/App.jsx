import { NavLink, Route, Routes } from 'react-router-dom';

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
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/movies" element={<div>Movies page</div>} />
        <Route path="/movies/:movieID" element={<div>Movie</div>} />
      </Routes>
    </div>
  );
};

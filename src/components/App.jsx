import { NavLink, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <nav>
        <NavLink>Home</NavLink>
        <NavLink>Movies</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
      </Routes>
    </div>
  );
};

// const API_KEY = 'b5c5f92c171eddbfa17290cd377a7ee0';

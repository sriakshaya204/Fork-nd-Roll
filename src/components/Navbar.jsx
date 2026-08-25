import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// Adjust the relative path if your movies dataset is located elsewhere (e.g., "../data/movies")
import * as movieModule from "../data/movies";
const moviesData = movieModule.moviesData || movieModule.movies || movieModule.default || [];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [lastSurpriseId, setLastSurpriseId] = useState(null);
  const navigate = useNavigate();

  // Problem 4: Dark Mode with LocalStorage persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  function toggleTheme() {
    setIsDarkMode((prev) => !prev);
  }

  // Bonus Challenge: Surprise Me (random selection without consecutive repeats)
  function handleSurpriseMe() {
    const pool = moviesData || [];
    if (pool.length === 0) return;

    const filteredPool = pool.length > 1 
      ? pool.filter((m) => String(m.id) !== String(lastSurpriseId)) 
      : pool;

    const randomIndex = Math.floor(Math.random() * filteredPool.length);
    const selectedMovie = filteredPool[randomIndex];

    setLastSurpriseId(selectedMovie.id);
    navigate(`/movies/${selectedMovie.id}`);
    setMenuOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchText.trim())}`);
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        <span className="logo-mark">C</span>
        <span>CineScope</span>
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={menuOpen ? "nav-content show" : "nav-content"}>
        <div className="nav-links">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/movies" onClick={() => setMenuOpen(false)}>
            Movies
          </NavLink>
          {/* Problem 3: Watchlist navigation */}
          <NavLink to="/watchlist" onClick={() => setMenuOpen(false)}>
            Watchlist
          </NavLink>
        </div>

        {/* Bonus Challenge: Surprise Me button */}
        <button 
          type="button" 
          className="surprise-btn" 
          onClick={handleSurpriseMe}
          style={{ cursor: "pointer", padding: "6px 12px", borderRadius: "4px" }}
        >
          🎲 Surprise Me
        </button>

        {/* Problem 4: Dark Mode switch button */}
        <button 
          type="button" 
          className="theme-toggle-btn" 
          onClick={toggleTheme}
          style={{ cursor: "pointer", padding: "6px 12px", borderRadius: "4px" }}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <form className="nav-search" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search movies"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    </header>
  );
}

export default Navbar;

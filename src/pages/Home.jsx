import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid.jsx";
import RecentlyViewed from "../components/RecentlyViewed.jsx";
import { movies } from "../data/movies.js";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState("");
  const searchTerm = searchParams.get("search") || "";
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Thriller", "Animation"];

  const featuredMovie = movies.find((movie) => movie.featured) || movies[0];

  let filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" ||
      (Array.isArray(movie.genre)
        ? movie.genre.includes(selectedGenre)
        : movie.genre === selectedGenre);

    return matchesSearch && matchesGenre;
  });

  if (sortOrder === "high-to-low") {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  } else if (sortOrder === "low-to-high") {
    filteredMovies.sort((a, b) => a.rating - b.rating);
  }

  return (
    <div className="home-container">
      {featuredMovie && (
        <div className="hero-banner">
          <img src={featuredMovie.bannerImage || featuredMovie.image} alt={featuredMovie.title} />
          <div className="hero-details">
            <h2>{featuredMovie.title}</h2>
            <p>{featuredMovie.description}</p>
            <Link to={`/movie/${featuredMovie.id}`} className="btn-watch">
              Watch Now
            </Link>
          </div>
        </div>
      )}

      <div className="controls-bar" style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
        <div className="genre-filter">
          <label>Filter by Genre: </label>
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="rating-sort">
          <label>Sort by Rating: </label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Default</option>
            <option value="high-to-low">Highest Rated</option>
            <option value="low-to-high">Lowest Rated</option>
          </select>
        </div>
      </div>

      <MovieGrid movies={filteredMovies} />
      <RecentlyViewed />
    </div>
  );
}

export default Home;
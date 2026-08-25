import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid.jsx";
import movies from "../data/movies.js";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Thriller", "Animation"];

  const featuredMovie = movies.find((movie) => movie.featured) || movies[0];

  // Filter movies by search term AND selected genre
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre =
      selectedGenre === "All" ||
      (Array.isArray(movie.genre)
        ? movie.genre.includes(selectedGenre)
        : movie.genre === selectedGenre);

    return matchesSearch && matchesGenre;
  });

  function handleSearchChange(event) {
    const value = event.target.value;
    if (value.trim() === "") {
      setSearchParams({});
      return;
    }
    setSearchParams({ search: value });
  }

  return (
    <div className="home-page">
      {/* Genre Filter Buttons */}
      <div className="genre-filter-container" style={{ display: "flex", gap: "10px", margin: "20px 0", flexWrap: "wrap" }}>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`genre-btn ${selectedGenre === genre ? "active" : ""}`}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              backgroundColor: selectedGenre === genre ? "#007bff" : "#fff",
              color: selectedGenre === genre ? "#fff" : "#000",
              cursor: "pointer"
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      <MovieGrid movies={filteredMovies} />
    </div>
  );
}

export default Home;
import React,{ useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import movies from "../data/movies.js";

function MovieDetails() {
  const { movieId } = useParams();
  const movie = movies.find((item) => item.id === Number(movieId));
  useEffect(() => {
  if (!movie) return;

  const recentMovies = JSON.parse(
    localStorage.getItem("recentlyViewed") || "[]"
  );

  const updatedMovies = [
    movie,
    ...recentMovies.filter((item) => item.id !== movie.id),
  ].slice(0, 5);

  localStorage.setItem("recentlyViewed", JSON.stringify(updatedMovies));
}, [movie]);
  if (!movie) {
    return (
      <section className="details-page not-found">
        <h1>Movie not found</h1>
        <p>The movie you are looking for is not available in CineScope.</p>
        <Link className="button" to="/">
          Back to Movies
        </Link>
      </section>
    );
  }

  return (
    <section className="details-page">
      <Link className="back-link" to="/">
        ← Back to Movies
      </Link>

      <div className="details-layout">
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div className="details-content">
          <p className="eyebrow">{movie.genre}</p>
          <h1>{movie.title}</h1>
          <p className="details-description">{movie.description}</p>

          <div className="details-list">
            <div>
              <span>Release Year</span>
              <strong>{movie.year}</strong>
            </div>
            <div>
              <span>Rating</span>
              <strong>★ {movie.rating}</strong>
            </div>
            <div>
              <span>Duration</span>
              <strong>{movie.duration}</strong>
            </div>
            <div>
              <span>Director</span>
              <strong>{movie.director}</strong>
            </div>
          </div>

          <div className="cast-section">
            <h2>Cast</h2>
            <ul>
              {movie.cast.map((actor) => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;

import React, { useEffect, useState } from "react";
import MovieGrid from "./MovieGrid.jsx";

function RecentlyViewed() {
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );

    setRecentMovies(storedMovies);
  }, []);

  if (recentMovies.length === 0) {
    return null;
  }

  return (
    <section className="recently-viewed">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your History</p>
          <h2>Recently Viewed</h2>
        </div>
      </div>

      <MovieGrid movies={recentMovies} />
    </section>
  );
}

export default RecentlyViewed;
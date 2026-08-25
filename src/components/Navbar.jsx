import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", padding: "1rem", backgroundColor: "#333", color: "#fff" }}>
      <div className="nav-logo">
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold" }}>
          MovieApp
        </Link>
      </div>
      <div className="nav-links" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
        <Link to="/watchlist" style={{ color: "#fff", textDecoration: "none" }}>Watchlist</Link>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Custom hook for fetching data
const useFetchMovies = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/movies")
      .then((response) => {
        console.log(response.text)
        return response.json()})
      .then((data) => {
        console.log("Fetched data:", data); // Debugging
        setData(Array.isArray(data.data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  return { data, loading };
};

// DropdownOptions component
const DropdownOptions = ({ options }) => {
  if (!Array.isArray(options.data)) {
    return (
      <li>
        <a className="dropdown-item" href="#">
          No options available
        </a>
      </li>
    );
  }

  return (
    <>
      {options.data.map((option, index) => (
        <li key={index}>
          <a className="dropdown-item" href="#">
            {typeof option === "string" ? option : "No plot available"}
          </a>
        </li>
      ))}
    </>
  );
};

// NavBar component
export const NavBar = () => {
  const { data: movies, loading } = useFetchMovies();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Movies Page
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pick a movie
              </a>
              <ul className="dropdown-menu">
                {loading ? (
                  <li>
                    <a className="dropdown-item" href="#">
                      Loading...
                    </a>
                  </li>
                ) : (
                  <DropdownOptions options={movies} />
                )}
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
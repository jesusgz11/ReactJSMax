import React, { useState, useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

const MoviesContent = ({ isLoading, error, movies }) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (movies.length > 0) return <MoviesList movies={movies} />;
  return <p>Found no movies.</p>;
};

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-733ef-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const dataMovies = Object.entries(data).map(([key, value]) => {
        return {
          id: key,
          ...value,
        };
      });
      setMovies(dataMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-733ef-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await response.json();
    fetchMovies();
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesContent isLoading={isLoading} movies={movies} error={error} />
      </section>
    </React.Fragment>
  );
}

export default App;

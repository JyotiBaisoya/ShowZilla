import React, { useState, useEffect } from 'react';
import Movie from './movie';

function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(' https://flaskagain.onrender.com/movies') 
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movie data:', error));
  }, []);

  return (
    <div>
      <h1>BookShow</h1>
      {movies.map((movie) => (
        <Movie key={movie._id.$oid} movieData={movie} />
      ))}
    </div>
  );
}

export default MoviesPage;

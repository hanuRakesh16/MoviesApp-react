import './App.css';
import SearchIcon from './search.svg';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

// ccba47ee
const apiKey = 'http://www.omdbapi.com?apikey=ccba47ee';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const searchMovies = async (title) => {
      const response = await fetch(`${apiKey}&s=${title}`); // fetching the data from the API
      const data = await response.json();
      setMovies(data.Search);
    }
  useEffect(() => {
    searchMovies('batman');
  }, []);
  return (
    <div className="app">
      <h1>Movies App</h1>
      <div className="search">
        <input 
        type="text" 
        placeholder="Search for a movie" 
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        />
        <img src={SearchIcon} alt="Search Icon" onClick={() => {
          searchMovies(search)
          }} />
      </div>

    {movies?.length > 0 ? (
      <div className="container">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div> 
      ) : (
      <div className="empty">
        <h2>No movies found</h2>
      </div>
      )}
    </div>
  );
}

export default App;

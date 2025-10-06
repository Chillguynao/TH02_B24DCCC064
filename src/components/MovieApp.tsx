import React, { useState } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

type Movie = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
};

const MovieList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    if (!search) return;
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=thewdb&s=${search}`
      );
      setMovies(res.data.Search || []);
    } catch {
      setMovies([]);
    }
  };

  return (
    <div>
      <h2 style={{ color: "green" }}>Tìm kiếm phim</h2>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Nhập tên phim..."
        style={{ marginRight: 8, color: "green", borderColor: "green" }}
      />
      <button onClick={fetchMovies} style={{ color: "green", borderColor: "green" }}>
        Tìm kiếm
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}>
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              border: "1px solid green",
              padding: 12,
              width: 220,
              cursor: "pointer",
              borderRadius: 8,
              color: "green", // màu chữ cho khung chứa phim
            }}
            onClick={() => navigate(`/movies/${movie.imdbID}`)}
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{ width: "100px", height: "150px", objectFit: "cover" }}
            />
            <h4>{movie.Title}</h4>
            <p>Năm: {movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const MovieDetail: React.FC = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<any>(null);

  React.useEffect(() => {
    if (imdbID) {
      axios
        .get(
          `https://www.omdbapi.com/?apikey=thewdb&i=${imdbID}&plot=full`
        )
        .then((res) => setMovie(res.data))
        .catch(() => setMovie(null));
    }
  }, [imdbID]);

  if (!movie) return <div style={{ color: "green" }}>Không tìm thấy phim.</div>;

  return (
    <div style={{ color: "green" }}>
      <Link to="/movies" style={{ color: "green", textDecoration: "underline" }}>
        ← Quay lại danh sách
      </Link>
      <h2>{movie.Title}</h2>
      <img
        src={movie.Poster}
        alt={movie.Title}
        style={{ width: "150px", height: "220px", objectFit: "cover" }}
      />
      <p>Năm: {movie.Year}</p>
      <p>IMDB: {movie.imdbID}</p>
      <p>{movie.Plot}</p>
    </div>
  );
};

const MovieApp: React.FC = () => (
  <Routes>
    <Route path="/" element={<MovieList />} />
    <Route path=":imdbID" element={<MovieDetail />} />
  </Routes>
);

export default MovieApp;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CountryApp from "./components/CountryApp";
import CurrencyApp from "./components/CurrencyApp";
import MovieApp from "./components/MovieApp";
import "./App.css";

export default function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
        <Link to="/countries">Tra cứu Quốc gia</Link>
        <Link to="/currency">Quy đổi tiền tệ</Link>
        <Link to="/movies">Tìm kiếm phim</Link>
      </nav>
      <Routes>
        <Route path="/countries/*" element={<CountryApp />} />
        <Route path="/currency" element={<CurrencyApp />} />
        <Route path="/movies/*" element={<MovieApp />} />
      </Routes>
    </Router>
  );
}

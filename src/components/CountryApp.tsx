import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

type Country = {
  name: { common: string };
  flags: { png: string };
  population: number;
  region: string;
};

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,flags,population,region")
      .then((res) => setCountries(res.data))
      .catch(() => setCountries([]));
  }, []);

  const filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ color: "green" }}>Danh sách quốc gia</h2>
      <input
        type="text"
        placeholder="Tìm kiếm quốc gia..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16, padding: 8, width: 250, color: "green", borderColor: "green" }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {filtered.map((country) => (
          <div
            key={country.name.common}
            style={{
              border: "1px solid green",
              padding: 12,
              width: 220,
              cursor: "pointer",
              borderRadius: 8,
              color: "green", 
            }}
            onClick={() => navigate(`/countries/${country.name.common}`)}
          >
            <img
              src={country.flags.png}
              alt={country.name.common}
              style={{ width: "100px", height: "60px", objectFit: "cover" }}
            />
            <h4>{country.name.common}</h4>
            <p>Dân số: {country.population.toLocaleString()}</p>
            <p>Khu vực: {country.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CountryDetail: React.FC = () => {
  const { name } = useParams();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,population,region`)
        .then((res) => setCountry(res.data[0]))
        .catch(() => setCountry(null));
    }
  }, [name]);

  if (!country) return <div style={{ color: "green" }}>Không tìm thấy quốc gia.</div>;

  return (
    <div style={{ color: "green" }}>
      <Link to="/countries" style={{ color: "green", textDecoration: "underline" }}>
        ← Quay lại danh sách
      </Link>
      <h2>{country.name.common}</h2>
      <img
        src={country.flags.png}
        alt={country.name.common}
        style={{ width: "150px", height: "90px", objectFit: "cover" }}
      />
      <p>Dân số: {country.population.toLocaleString()}</p>
      <p>Khu vực: {country.region}</p>
    </div>
  );
};

const CountryApp: React.FC = () => (
  <Routes>
    <Route path="/" element={<CountryList />} />
    <Route path=":name" element={<CountryDetail />} />
  </Routes>
);

export default CountryApp;

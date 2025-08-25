import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/recherche?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="navbar navbar-expand-lg">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src="/Logo.png" alt="Logo" width="36" height="36" />
          <span className="fw-bold">Trouve ton artisan</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="mainNav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categories.map((c) => (
              <li className="nav-item" key={c.id}>
                <Link className="nav-link" to={`/categorie/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          <form className="d-flex" role="search" onSubmit={onSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Rechercher un artisan…"
              aria-label="Rechercher un artisan"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

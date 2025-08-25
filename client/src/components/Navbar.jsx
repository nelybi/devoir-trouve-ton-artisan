import { useEffect, useState } from "react";

export default function Navbar({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erreur fetch catégories:", err));
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0.8rem 1.2rem",
        background: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <div style={{ marginRight: "2rem" }}>
        <img src="/Logo.png" alt="Logo" style={{ height: "40px" }} />
      </div>

      {/* Menu */}
      <ul
        style={{
          display: "flex",
          gap: "1.5rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {categories.map((cat) => (
          <li
            key={cat.id}
            style={{ cursor: "pointer", fontWeight: "500", color: "#333" }}
            onClick={() => onSelectCategory?.(cat.slug)}
            onMouseOver={(e) => (e.target.style.color = "#007BFF")}
            onMouseOut={(e) => (e.target.style.color = "#333")}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}

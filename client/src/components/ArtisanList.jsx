import { useEffect, useState } from "react";

export default function ArtisanList({ categorySlug }) {
  const [loading, setLoading] = useState(false);
  const [artisans, setArtisans] = useState([]);
  const [info, setInfo] = useState({ category: null, specialties: [] });

  useEffect(() => {
    if (!categorySlug) return;
    (async () => {
      try {
        setLoading(true);
        // 1) récupérer les spécialités de la catégorie
        const r1 = await fetch(`/api/categories/${categorySlug}/specialties`);
        const { category, specialties } = await r1.json();
        setInfo({ category, specialties });

        if (!specialties.length) {
          setArtisans([]);
          setLoading(false);
          return;
        }
        // 2) charger les artisans de la première spécialité (simple pour cette étape)
        const firstSpecId = specialties[0].id;
        const r2 = await fetch(`/api/artisans?specialtyId=${firstSpecId}`);
        const data = await r2.json();
        setArtisans(data);
      } catch (e) {
        console.error(e);
        setArtisans([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [categorySlug]);

  if (!categorySlug)
    return (
      <p style={{ padding: "1rem 1.5rem" }}>
        Choisis une catégorie pour afficher des artisans.
      </p>
    );
  if (loading) return <p style={{ padding: "1rem 1.5rem" }}>Chargement…</p>;

  return (
    <div style={{ padding: "1rem 1.5rem" }}>
      {info.category && <h2>Artisans — {info.category.name}</h2>}
      {artisans.length === 0 ? (
        <p>Aucun artisan pour l’instant.</p>
      ) : (
        <ul
          style={{
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            listStyle: "none",
          }}
        >
          {artisans.map((a) => (
            <li
              key={a.id}
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "10px",
                padding: "12px",
              }}
            >
              <div style={{ fontWeight: 600 }}>{a.name}</div>
              <div style={{ fontSize: ".95rem", color: "#555" }}>
                {a.city || "—"}
              </div>
              <div style={{ marginTop: 6, fontSize: ".9rem" }}>
                ⭐ {a.rating ?? "—"}
              </div>
              {a.website && (
                <div style={{ marginTop: 6 }}>
                  <a href={a.website} target="_blank" rel="noreferrer">
                    Site web
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

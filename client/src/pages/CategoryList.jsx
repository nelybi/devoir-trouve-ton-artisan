import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function CategoryList() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const q = params.get("q")?.toLowerCase() || "";
  const [state, setState] = useState({
    category: null,
    specialties: [],
    artisans: [],
    loading: true,
  });

  useEffect(() => {
    (async () => {
      setState((s) => ({ ...s, loading: true }));
      const r1 = await fetch(`/api/categories/${slug}/specialties`);
      const { category, specialties } = await r1.json();
      let allArtisans = [];
      for (const spec of specialties) {
        const r2 = await fetch(`/api/artisans?specialtyId=${spec.id}`);
        const list = await r2.json();
        allArtisans = allArtisans.concat(
          list.map((a) => ({ ...a, __spec: spec.name }))
        );
      }
      const filtered = q
        ? allArtisans.filter((a) => a.name.toLowerCase().includes(q))
        : allArtisans;
      setState({ category, specialties, artisans: filtered, loading: false });
    })();
  }, [slug, q]);

  if (state.loading) return <div className="container py-4">Chargement…</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Artisans — {state.category?.name}</h1>
      {state.artisans.length === 0 ? (
        <p>Aucun artisan trouvé.</p>
      ) : (
        <div className="row g-3">
          {state.artisans.map((a) => (
            <div className="col-12 col-md-6 col-lg-4" key={a.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h5 mb-1">{a.name}</h3>
                  <div className="text-muted">{a.__spec}</div>
                  <div className="small mt-1">📍 {a.city || "—"}</div>
                  <div className="small">⭐ {a.rating ?? "—"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

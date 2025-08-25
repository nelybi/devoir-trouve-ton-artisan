export default function Home() {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Trouve ton artisan</h1>

      <section className="mb-5">
        <h2 className="h4 mb-3">Comment trouver mon artisan ?</h2>
        <div className="row g-3">
          {[
            { n: 1, t: "Choisir la catégorie d’artisanat dans le menu." },
            { n: 2, t: "Choisir un artisan." },
            { n: 3, t: "Le contacter via le formulaire en ligne." },
            { n: 4, t: "Une réponse sera apportée sous 48h." },
          ].map((s) => (
            <div className="col-12 col-md-6 col-lg-3" key={s.n}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="badge bg-primary rounded-pill mb-2">
                    {s.n}
                  </div>
                  <p className="mb-0">{s.t}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="h4 mb-3">Les artisans du mois</h2>
        <div className="alert alert-info">
          Section à compléter : 3 artisans (nom, note ★, spécialité,
          localisation).
        </div>
      </section>
    </div>
  );
}

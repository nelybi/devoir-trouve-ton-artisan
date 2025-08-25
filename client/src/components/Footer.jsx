import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto py-4 border-top bg-white">
      <div className="container small d-flex flex-column flex-md-row justify-content-between gap-3">
        <nav className="d-flex gap-3">
          <Link to="/mentions-legales" className="link-secondary">
            Mentions légales
          </Link>
          <Link to="/donnees-personnelles" className="link-secondary">
            Données personnelles
          </Link>
          <Link to="/accessibilite" className="link-secondary">
            Accessibilité
          </Link>
          <Link to="/cookies" className="link-secondary">
            Cookies
          </Link>
        </nav>
        <address className="mb-0 text-secondary">
          <strong>Antenne de Lyon</strong> — 101 cours Charlemagne, CS 20033,
          69269 LYON CEDEX 02, France — +33 (0)4 26 73 40 00
        </address>
      </div>
    </footer>
  );
}

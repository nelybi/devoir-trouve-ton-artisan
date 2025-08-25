import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryList from "./pages/CategoryList";
import ArtisanDetail from "./pages/ArtisanDetail";
import LegalEmpty from "./pages/LegalEmpty";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorie/:slug" element={<CategoryList />} />
            <Route path="/recherche" element={<CategoryList />} />
            <Route path="/artisan/:id" element={<ArtisanDetail />} />
            <Route
              path="/mentions-legales"
              element={<LegalEmpty title="Mentions légales" />}
            />
            <Route
              path="/donnees-personnelles"
              element={<LegalEmpty title="Données personnelles" />}
            />
            <Route
              path="/accessibilite"
              element={<LegalEmpty title="Accessibilité" />}
            />
            <Route path="/cookies" element={<LegalEmpty title="Cookies" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

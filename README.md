# Trouve ton artisan – Auvergne-Rhône-Alpes

Application full-stack **React + Vite** (front) / **Express + Sequelize + MySQL** (back) pour rechercher des **artisans** par **catégorie** et **spécialité**, avec pages de base, favicons, police **Graphik**, **Bootstrap 5 + Sass**, et scripts SQL de création/seed.

---

## Sommaire
- [Aperçu](#aperçu)
- [Stack & Structure](#stack--structure)
- [Prérequis](#prérequis)
- [Installation & Lancement (dev)](#installation--lancement-dev)
- [Variables d’environnement](#variables-denvironnement)
- [Base de données (SQL)](#base-de-données-sql)
- [Endpoints principaux](#endpoints-principaux)
- [Front : Navigation & Fonctionnalités](#front--navigation--fonctionnalités)
- [Sécurité (mesures mises en place)](#sécurité-mesures-mises-en-place)
- [MCD / MLD (résumé)](#mcd--mld-résumé)
- [Déploiement (pistes)](#déploiement-pistes)
- [Liens à fournir dans le dossier PDF](#liens-à-fournir-dans-le-dossier-pdf)
- [Licence](#licence)

---

## Stack & Structure

**Front :**
- React + Vite
- Bootstrap 5 via **Sass** (`@use`)
- Police **Graphik** (fichiers `.woff2/.woff` locaux) + fallback Poppins (Google Fonts)
- Proxy Vite → `/api` vers `http://localhost:4001`

**Back :**
- Express
- Sequelize + MySQL2
- Models : `Category` → `Specialty` → `Artisan`

**Arborescence :**
devoir-trouve-ton-artisan/
├─ client/ # Frontend
│ ├─ public/
│ │ ├─ favicon.png, favicon-32.png, Logo.png
│ │ └─ fonts/Graphik/Graphik-Regular.{woff2,woff}
│ ├─ src/
│ │ ├─ styles/ (_variables.scss, main.scss)
│ │ ├─ components/ (Header, Footer, ...)
│ │ ├─ pages/ (Home, CategoryList, 404, ...)
│ │ ├─ App.jsx, main.jsx
│ │ └─ vite.config.js
│ └─ package.json
└─ server/ # Backend
├─ src/
│ ├─ models/ (Category, Specialty, Artisan)
│ ├─ controllers/ (categories, artisans)
│ ├─ routes/ (health, categories, artisans)
│ ├─ config/db.js, app.js, index.js
├─ sql/ (create_schema.sql, seed_data.sql)
├─ .env.example
└─ package.json

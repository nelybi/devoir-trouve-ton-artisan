-- seed_data.sql
-- Données de démonstration cohérentes avec le seed côté Node

USE artisans_db;

-- Catégories
INSERT INTO categories (name, slug) VALUES
  ('Bâtiment', 'batiment'),
  ('Services', 'services'),
  ('Fabrication', 'fabrication'),
  ('Alimentation', 'alimentation')
ON DUPLICATE KEY UPDATE name = VALUES(name), slug = VALUES(slug);

-- Spécialités (liées à Bâtiment + Services)
-- On récupère les id des catégories par leur slug pour éviter de dépendre d'ids fixes
SET @cat_bat := (SELECT id FROM categories WHERE slug = 'batiment');
SET @cat_srv := (SELECT id FROM categories WHERE slug = 'services');

INSERT INTO specialties (name, slug, categoryId) VALUES
  ('Plomberie', 'plomberie', @cat_bat),
  ('Électricité', 'electricite', @cat_bat),
  ('Peinture', 'peinture', @cat_bat),
  ('Ménage', 'menage', @cat_srv)
ON DUPLICATE KEY UPDATE name = VALUES(name), slug = VALUES(slug), categoryId = VALUES(categoryId);

-- Artisans (liés aux spécialités par slug)
SET @spec_plomb := (SELECT id FROM specialties WHERE slug = 'plomberie');
SET @spec_elec  := (SELECT id FROM specialties WHERE slug = 'electricite');
SET @spec_men   := (SELECT id FROM specialties WHERE slug = 'menage');

INSERT INTO artisans (name, rating, city, about, website, specialtyId) VALUES
  ('Jean Dupont', 4.6, 'Paris', 'Urgences 24/7', NULL, @spec_plomb),
  ('Plomberie Martin', 4.2, 'Nanterre', NULL, NULL, @spec_plomb),
  ('Élec Lumière', 4.8, 'Boulogne', 'Diagnostics & rénovations', NULL, @spec_elec),
  ('Ménage Express', 4.4, 'Paris', 'Prestations ponctuelles', NULL, @spec_men);

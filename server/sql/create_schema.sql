-- create_schema.sql
-- Schéma pour "Trouve ton artisan"
-- Encodage & moteur pour le support Unicode et les contraintes
CREATE DATABASE IF NOT EXISTS artisans_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE artisans_db;

-- Par sécurité (exécution multiple)
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialties;
DROP TABLE IF EXISTS categories;

SET FOREIGN_KEY_CHECKS = 1;

-- Table catégories (modèle: Category)
CREATE TABLE categories (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_name (name),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table spécialités (modèle: Specialty)
CREATE TABLE specialties (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL,
  categoryId INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_specialties_name (name),
  UNIQUE KEY uq_specialties_slug (slug),
  KEY idx_specialties_categoryId (categoryId),
  CONSTRAINT fk_specialties_category
    FOREIGN KEY (categoryId) REFERENCES categories(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table artisans (modèle: Artisan)
CREATE TABLE artisans (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  rating DECIMAL(2,1) NULL,
  city VARCHAR(120) NULL,
  about TEXT NULL,
  website VARCHAR(255) NULL,
  specialtyId INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  KEY idx_artisans_specialtyId (specialtyId),
  CONSTRAINT fk_artisans_specialty
    FOREIGN KEY (specialtyId) REFERENCES specialties(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

import { Category, Specialty, Artisan } from "../models/index.js";

// POST /api/_seed/specialties
export async function seedSpecialties(req, res) {
  try {
    const bat = await Category.findOne({ where: { slug: "batiment" } });
    const serv = await Category.findOne({ where: { slug: "services" } });
    if (!bat || !serv)
      return res.status(400).json({ error: "Seed categories first" });

    const specsData = [
      { name: "Plomberie", slug: "plomberie", categoryId: bat.id },
      { name: "Électricité", slug: "electricite", categoryId: bat.id },
      { name: "Peinture", slug: "peinture", categoryId: bat.id },
      { name: "Ménage", slug: "menage", categoryId: serv.id },
    ];

    for (const s of specsData) {
      await Specialty.findOrCreate({ where: { slug: s.slug }, defaults: s });
    }

    res.json({ ok: true, message: "Specialties seeded" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Seed specialties failed" });
  }
}

// POST /api/_seed/artisans
export async function seedArtisans(req, res) {
  try {
    const plomberie = await Specialty.findOne({ where: { slug: "plomberie" } });
    const electricite = await Specialty.findOne({
      where: { slug: "electricite" },
    });
    const menage = await Specialty.findOne({ where: { slug: "menage" } });
    if (!plomberie || !electricite || !menage)
      return res.status(400).json({ error: "Seed specialties first" });

    const artisansData = [
      {
        name: "Jean Dupont",
        rating: 4.6,
        city: "Paris",
        about: "Urgences 24/7",
        website: null,
        specialtyId: plomberie.id,
      },
      {
        name: "Plomberie Martin",
        rating: 4.2,
        city: "Nanterre",
        about: null,
        website: null,
        specialtyId: plomberie.id,
      },
      {
        name: "Élec Lumière",
        rating: 4.8,
        city: "Boulogne",
        about: "Diagnostics & rénovations",
        specialtyId: electricite.id,
      },
      {
        name: "Ménage Express",
        rating: 4.4,
        city: "Paris",
        about: "Prestations ponctuelles",
        specialtyId: menage.id,
      },
    ];

    for (const a of artisansData) {
      await Artisan.create(a);
    }

    res.json({ ok: true, created: artisansData.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Seed artisans failed" });
  }
}

// GET /api/artisans?specialtyId=ID
export async function getArtisansBySpecialty(req, res) {
  try {
    const { specialtyId } = req.query;
    if (!specialtyId)
      return res.status(400).json({ error: "Missing specialtyId" });

    const rows = await Artisan.findAll({
      where: { specialtyId },
      attributes: ["id", "name", "rating", "city", "website", "specialtyId"],
      order: [["rating", "DESC"]],
    });

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}

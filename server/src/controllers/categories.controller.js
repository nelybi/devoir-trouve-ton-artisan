import { Category, Specialty } from "../models/index.js";

// GET /api/categories
export async function getCategories(req, res) {
  try {
    const cats = await Category.findAll({
      attributes: ["id", "name", "slug"],
      order: [["name", "ASC"]],
    });
    res.json(cats);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}

// GET /api/categories/:slug/specialties
export async function getSpecialtiesByCategory(req, res) {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ where: { slug } });
    if (!category) return res.status(404).json({ error: "Category not found" });

    const specs = await Specialty.findAll({
      where: { categoryId: category.id },
      attributes: ["id", "name", "slug", "categoryId"],
      order: [["name", "ASC"]],
    });

    res.json({
      category: { id: category.id, name: category.name, slug: category.slug },
      specialties: specs,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}

// POST /api/_seed/categories
export async function seedCategories(req, res) {
  try {
    const count = await Category.count();
    if (count > 0)
      return res.json({ ok: true, message: "Categories already seeded" });

    const data = [
      { name: "Bâtiment", slug: "batiment" },
      { name: "Services", slug: "services" },
      { name: "Fabrication", slug: "fabrication" },
      { name: "Alimentation", slug: "alimentation" },
    ];

    for (const c of data) await Category.create(c);
    res.json({ ok: true, created: data.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Seed failed" });
  }
}

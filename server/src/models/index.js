import { sequelize } from "../config/db.js";
import CategoryFactory from "./Category.js";
import SpecialtyFactory from "./Specialty.js";
import ArtisanFactory from "./Artisan.js";

const Category = CategoryFactory(sequelize);
const Specialty = SpecialtyFactory(sequelize);
const Artisan = ArtisanFactory(sequelize);

// Associations
Category.hasMany(Specialty, {
  foreignKey: { name: "categoryId", allowNull: false },
  as: "specialties",
});
Specialty.belongsTo(Category, {
  foreignKey: { name: "categoryId", allowNull: false },
  as: "category",
});

Specialty.hasMany(Artisan, {
  foreignKey: { name: "specialtyId", allowNull: false },
  as: "artisans",
});
Artisan.belongsTo(Specialty, {
  foreignKey: { name: "specialtyId", allowNull: false },
  as: "specialty",
});

export { sequelize, Category, Specialty, Artisan };

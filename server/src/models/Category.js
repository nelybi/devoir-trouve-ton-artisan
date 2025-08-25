import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Category extends Model {}

  Category.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      slug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: false,
    }
  );

  return Category;
};

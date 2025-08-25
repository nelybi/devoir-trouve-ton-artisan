import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Artisan extends Model {}

  Artisan.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(150), allowNull: false },
      rating: { type: DataTypes.DECIMAL(2, 1), allowNull: true }, // ex: 4.5
      city: { type: DataTypes.STRING(120), allowNull: true },
      about: { type: DataTypes.TEXT, allowNull: true },
      website: { type: DataTypes.STRING(255), allowNull: true },
    },
    {
      sequelize,
      modelName: "Artisan",
      tableName: "artisans",
      timestamps: false,
    }
  );

  return Artisan;
};

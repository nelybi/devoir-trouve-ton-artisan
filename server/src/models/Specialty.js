import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Specialty extends Model {}

  Specialty.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      slug: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Specialty",
      tableName: "specialties",
      timestamps: false,
    }
  );

  return Specialty;
};

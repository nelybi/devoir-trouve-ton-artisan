import "dotenv/config"; // charge .env AVANT de lire process.env
import { Sequelize } from "sequelize";

const {
  DB_HOST = "127.0.0.1",
  DB_PORT = "3306",
  DB_NAME = "artisans_db",
  DB_USER, // on NE met PAS de valeur par défaut ici
  DB_DIALECT = "mysql",
  NODE_ENV = "development",
} = process.env;

// Si DB_PASS est vide dans .env, on passe undefined -> MySQL tentera sans mot de passe
const rawPass = process.env.DB_PASS;
const DB_PASS = rawPass === "" || rawPass === undefined ? undefined : rawPass;

if (NODE_ENV === "development") {
  const passFlag =
    rawPass === undefined ? "<unset>" : DB_PASS ? "<set>" : "<none>";
  console.log(
    `🔧 Sequelize config → host=${DB_HOST} db=${DB_NAME} user=${
      DB_USER ?? "<unset>"
    } pass=${passFlag}`
  );
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: DB_DIALECT,
  logging: NODE_ENV === "development" ? false : false,
});

import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export default abstract class BaseDatabase {
  // estabelecer a conexão com o banco no index.ts
  protected static connection = knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || "3000"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multiStatements: true
    },
  });
}
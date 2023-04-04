import { Sequelize } from "sequelize";
import dotenv from "dotenv/config.js";

const db = new Sequelize(process.env.DB_NAME || "gerenciar-links", process.env.DB_USERNAME || "root", process.env.DB_PASSWORD || "sqlroot", {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306
});

export default db 
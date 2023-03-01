import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/db.js";
import linkRouter from "./routes/index.js";
import dotenv from "dotenv/config.js";

const app = express();
const PORT = process.env.PORT;

(async () => {
    try {
        await db.authenticate();
        console.log(`. O banco de dados ${process.env.DB_NAME} foi conectado`);
    }
    catch (error) {
        console.error(`Erro ao conectar o banco de dados ${process.env.DB_NAME}. ${error} `);
    }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(linkRouter);

app.listen(PORT, () =>
    console.log(`Servidor iniciado na porta ${PORT}`)
);




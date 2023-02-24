import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/db.js";
import linkRouter from "./routes/index.js"

const app = express();
const port = 4000;

(async () => {
    try {
        const response = await db.sync();
        console.log(response, `. O banco de dados ${process.env.DB_NAME} foi conectado`);
    }
    catch (error) {
        console.error(`Erro ao conectar o banco de dados ${process.env.DB_NAME}. `, error);
    }
})();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(linkRouter);

app.listen( port, () =>
    console.log(`Servidor iniciado na porta ${port}`)
);



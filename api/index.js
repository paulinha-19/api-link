const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const linkRouter = require("./routes/index");
const app = express();
require("dotenv").config();

(async () => {
  try {
    await db.sync();
    console.log(`. O banco de dados ${process.env.DB_NAME} foi conectado`);
  } catch (error) {
    console.error(
      `Erro ao conectar o banco de dados ${process.env.DB_NAME}. ${error} `
    );
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(linkRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Servidor iniciado na porta ${process.env.PORT}`)
);

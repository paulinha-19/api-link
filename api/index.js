const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const linkRouter = require("./routes/index");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(linkRouter);

app.listen(process.env.PORT || 3000, () =>
    console.log(`Servidor iniciado na porta ${process.env.PORT}`)
);




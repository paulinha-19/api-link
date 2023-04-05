import { DataTypes } from "sequelize";
import db from "../config/db.js"

const Link = db.define("Link", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "O campo url não pode ser vazio"
            },
            isUrl: {
                msg: "A url inserida não é válida Verifique se existe algum espaço desnecessário ou o formato da Url."
            }
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "O campo titulo não pode ser vazio"
            },
        }
    },
})

export default Link
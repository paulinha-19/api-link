import { DataTypes } from "sequelize";
import db from "../config/db.js";

function isValidUrl(value) {
    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return urlRegex.test(value);
}

const Link = db.define('link', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
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
                msg: "A url inserida não é válida"
            }
            // isUrl: isValidUrl,
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
    }
});

export default Link
import Link from "../models/linkModel.js";

const getAllLink = async (req, res) => {
    try {
        const links = await Link.findAll();
        return res.status(200).send(links);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

const getOneLink = async (req, res) => {
    try {
        const { id } = req.params;
        const getLink = await Link.findOne({ where: { id } });
        if (!getLink) {
            return res.status(400).send({ message: "Dados não encontrado." });
        }
        return res.status(200).send(getLink);
    }
    catch (error) {
        return res.status(400).send(error)
    }
}

const createLink = async (req, res) => {
    const { url, title } = req.body;
    try {
        let findUrlExists = await Link.findOne({ where: { url } })
        let findTitleExists = await Link.findOne({ where: { title } })
        if (!findUrlExists && !findTitleExists) {
            const newLink = await Link.create({
                url,
                title
            });
            return res.status(200).send({ message: "Dados criados", newLink });
        }
        if (findUrlExists) {
            return res.status(400).send({
                message: `A url ${url} já existe. Para adicionar tente outro nome!`,
            });
        }
        if (findTitleExists) {
            return res.status(400).send({
                message: `O titulo ${title} já existe. Para adicionar tente outro nome!`,
            });
        }
    }
    catch (error) {
        const data = error.errors.map((numbers) => (
            console.log(numbers.message)
        ))
        console.log(data);
        return res.status(400).send({ message: error.errors })
    }
}

const updateLink = async (req, res) => {
    try {
        const { url, title } = req.body;
        const { id } = req.params;
        const findUrlExists = await Link.findOne({ where: { url } })
        const findTitleExists = await Link.findOne({ where: { title } })
        if (findUrlExists) {
            return res.status(400).send({
                message: `A url ${url} já existe. Para alterar tente outro nome.`,
            });
        }
        if (findTitleExists) {
            return res.status(400).send({
                message: `O titulo ${title} já existe. Para alterar tente outro nome.`,
            });
        }
        const linkUpdate = await Link.update(req.body, {
            where: {
                id: id
            }
        });
        if (!linkUpdate) {
            return res.status(400).send({
                message: `Os dados não podem ser atualizados pois não foram encontrados`,
            })
        }
        return res.status(200).send({
            message: `Dado atualizado`,
            url,
            title
        });
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

const deleteOneUrl = async (req, res) => {
    const { url, title } = req.body
    try {
        const { id } = req.params
        const urlRemoved = await Link.destroy({ where: { id } });
        if (!urlRemoved) {
            return res.status(400).send({ message: "Os dados não podem ser removidos pois não existem." });
        }
        return res.status(200).send({ message: "Dados removidos", url, title });
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

const deleteAllUrl = async (res) => {
    try {
        const urlAllRemoved = await Link.destroy({ where: {}, truncate: false });
        if (!urlAllRemoved) {
            return res.status(400).send({ message: "Os dados não podem ser removidos pois não existem." });
        }
        return res.status(200).send({ message: "Todos os dados foram removidos" });
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

export default { getAllLink, getOneLink, createLink, updateLink, deleteOneUrl, deleteAllUrl }

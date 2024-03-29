const linkModel = require("../models/link-manager");
const webCrawler = require("../utils/webCrawler");

exports.getAllLink = async (req, res) => {
    try {
        const links = await linkModel.findAll();
        return res.status(200).send(links);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

exports.getOneLink = async (req, res) => {
    try {
        const { id } = req.params;
        const getLink = await linkModel.findOne({ where: { id } });
        if (!getLink) {
            return res.status(400).send({ message: "Dados não encontrado." });
        }
        return res.status(200).send(getLink);
    }
    catch (error) {
        return res.status(400).send(error)
    }
}

exports.createLink = async (req, res) => {
    const { url, title } = req.body;
    try {
        let findUrlExists = await linkModel.findOne({ where: { url } })
        let findTitleExists = await linkModel.findOne({ where: { title } })
        if (!findUrlExists && !findTitleExists) {
            const newLink = await linkModel.create({
                url,
                title
            });
            return res.status(200).send({ message: "Dados criados", data: newLink });
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
        return res.status(400).send({ message: error.errors })
    }
}

exports.createLinkAutomated = async (req, res) => {
    try {
        const { url } = req.body;
        const crawler = await webCrawler.webCrawler(url);
        console.log("RESPONSE", crawler);
        const foundItems = [];
        const notFoundItems = [];
        await Promise.all(crawler.map(async (cur) => {
            const urlFound = await linkModel.findOne({ where: { url: cur.url } });
            const titleFound = await linkModel.findOne({ where: { title: cur.title } });
            if (urlFound || titleFound) {
                foundItems.push(cur);
                console.log("ADD em FOUNDITEMS", foundItems);
            } else {
                notFoundItems.push(cur);
                console.log("ADD em NOTFOUND")
            }
        }));

        if (notFoundItems.length > 0) {
            const newLink = await linkModel.bulkCreate(notFoundItems);
            console.log("ITENS CRIADOS no DB", newLink)
            return res.status(200).send({ message: `Dados criados`, data: newLink });
        } else {
            return res.status(400).send({ message: `Provavelmente os dados que você está tentando inserir já existem no banco de dados.`, data: foundItems });
        }
    }
    catch (error) {
        console.log({ message: error.message });
        return res.status(400).send(error.message)
    }
}

exports.updateLink = async (req, res) => {
    try {
        const { url, title } = req.body;
        const { id } = req.params;
        const findUrlExists = await linkModel.findOne({ where: { url } })
        const findTitleExists = await linkModel.findOne({ where: { title } })
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
        const linkUpdate = await linkModel.update(req.body, {
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

exports.deleteOneUrl = async (req, res) => {
    const { url, title } = req.body
    try {
        const { id } = req.params
        const urlRemoved = await linkModel.destroy({ where: { id } });
        if (!urlRemoved) {
            return res.status(400).send({ message: "Os dados não podem ser removidos pois não existem." });
        }
        return res.status(200).send({ message: "Dados removidos" });
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.deleteAllUrl = async (res) => {
    try {
        const urlAllRemoved = await linkModel.destroy({ where: {}, truncate: false });
        if (!urlAllRemoved) {
            return res.status(400).send({ message: "Os dados não podem ser removidos pois não existem." });
        }
        return res.status(200).send({ message: "Todos os dados foram removidos" });
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}


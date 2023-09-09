const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const webCrawler = require("../utils/webCrawler");

exports.getAllLink = async (req, res) => {
  try {
    const links = await prisma.link.findMany();
    res.status(200).send(links);
  } catch (error) {
    return res.status(400).send({ message: error, error: true });
  }
};

exports.getOneLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await prisma.link.findUnique({ where: { id: Number(id) } });
    if (!link) {
      return res.status(404).json({ message: "Data not found." });
    }
    return res.status(200).json(link);
  } catch (error) {
    console.error("Error fetching link:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching link.", error: true });
  }
};

exports.createLink = async (req, res) => {
  try {
    const { url, title } = req.body;
    const findUrlExists = await prisma.link.findUnique({
      where: { url },
    });

    if (findUrlExists) {
      return res.status(400).send({
        message: `A url ${url} já existe. Tente outra URL`,
        error: true,
      });
    }

    const findTitleExists = await prisma.link.findUnique({
      where: { title },
    });

    if (findTitleExists) {
      return res.status(400).send({
        message: `O titulo ${title} já existe. Tente outro nome`,
        error: true,
      });
    }

    const newLink = await prisma.link.create({
      data: { url, title },
    });
    return res.status(201).send({ message: "Dados criados", data: newLink });
  } catch (error) {
    console.error("Error creating link:", error);
    return res.status(500).send({ message: error.errors, error: true });
  }
};

exports.createLinkAutomated = async (req, res) => {
  try {
    const { url } = req.body;
    const crawler = await webCrawler.webCrawler(url);
    console.log("RESPONSE", crawler);
    const foundItems = [];
    const notFoundItems = [];
    await Promise.all(
      crawler.map(async (cur) => {
        const urlFound = await prisma.link.findFirst({
          where: { url: cur.url },
        });

        const titleFound = await prisma.link.findFirst({
          where: { title: cur.title },
        });

        if (urlFound || titleFound) {
          foundItems.push(cur);
          console.log("ADD em FOUNDITEMS", foundItems);
        } else {
          notFoundItems.push(cur);
          console.log("ADD em NOTFOUND");
        }
      })
    );

    if (notFoundItems.length > 0) {
      const newLink = await prisma.link.createMany(notFoundItems);
      console.log("ITENS CRIADOS no DB", newLink);
      return res.status(200).send({ message: `Dados criados`, data: newLink });
    } else {
      return res.status(400).send({
        message: `Provavelmente os dados que você está tentando inserir já existem no banco de dados.`,
        data: foundItems,
      });
    }
  } catch (error) {
    console.log({ message: error.message });
    return res.status(400).send(error.message);
  }
};

exports.updateLink = async (req, res) => {
  try {
    const { url, title } = req.body;
    const { id } = req.params;
    const findUrlExists = await prisma.link.findUnique({
      where: {
        url: cur.url,
      },
    });

    const findTitleExists = await prisma.link.findUnique({
      where: {
        title: cur.title,
      },
    });
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
    const linkUpdate = await prisma.link.update(req.body, {
      where: {
        id: id,
      },
    });
    if (!linkUpdate) {
      return res.status(400).send({
        message: `Os dados não podem ser atualizados pois não foram encontrados`,
      });
    }
    return res.status(200).send({
      message: `Dado atualizado`,
      url,
      title,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.deleteOneUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await prisma.link.findUnique({
      where: { id: Number(id) },
    });
    if (!link) {
      return res.status(400).send({
        message: "Os dados não podem ser removidos pois não existem.",
        error: true,
      });
    }
    await prisma.link.delete({
      where: { id: Number(id) },
    });
    return res.status(200).send({
      message: `A url ${link.url} e title ${link.title} foram removidos`,
    });
  } catch (error) {
    console.error("Error deleting link:", error);
    return res.status(500).send({ messagem: error.message, error: true });
  }
};

exports.deleteAllUrl = async (req, res) => {
  try {
    const existingLinks = await prisma.link.findMany();
    if (existingLinks.length === 0) {
      return res
        .status(404)
        .send({ message: "No links found to delete", error: true });
    }
    await prisma.link.deleteMany();
    return res.status(204).send({ message: "All data removed" });
  } catch (error) {
    console.error("Error deleting links:", error);
    return res.status(500).json({ message: error.message, error: true });
  }
};

// module.exports = {
//   getAllLink,
//   // ...
// };

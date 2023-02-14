import express from "express";
import linkController from "../controllers/linkController.js";
const router = express.Router();

router.get("/api", (req, res) => {
    return res.json({ message: "Server is on" });
});
router.get("/api/links", linkController.getAllLink);
router.get("/api/links/:id", linkController.getOneLink);
router.post("/api/links", linkController.createLink);
router.put("/api/links/:id", linkController.updateLink);
router.delete("/api/links/:id", linkController.deleteOneUrl);
router.delete("/api/links/", linkController.deleteAllUrl);

export { router as default };
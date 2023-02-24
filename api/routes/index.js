import express from "express";
import linkController from "../controllers/linkController.js";
const router = express.Router();

router.get("/api", (req, res) => {
    return res.json({ message: "Server is on" });
});
router.get("/api/links", linkController.getAllLink);
router.get("/api/links/:id", linkController.getOneLink);
router.post("/api/links", linkController.createLink);
router.post("/api/links/automated", linkController.createLinkAutomated);
router.put("/api/links/:id", linkController.updateLink);
router.delete("/api/links/:id", linkController.deleteOneUrl);

export { router as default };
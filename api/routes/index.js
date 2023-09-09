const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");

router.get("/api", (req, res) => {
    return res.json({ message: "Server is on" });
});
router.get("/api/links", linkController.getAllLink);
router.get("/api/links/:id", linkController.getOneLink);
router.post("/api/links", linkController.createLink);
router.post("/api/links/automated", linkController.createLinkAutomated);
router.put("/api/links/:id", linkController.updateLink);
router.delete("/api/links/:id", linkController.deleteOneUrl);
router.delete("/api/links", linkController.deleteAllUrl);

module.exports = router;
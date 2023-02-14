import express from "express";
const router = express.Router();

router.get("/api", (req, res) => {
    return res.json({ message: "Server is on" });
});

export { router as default };
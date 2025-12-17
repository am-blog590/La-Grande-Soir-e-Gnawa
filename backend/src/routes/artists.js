import express from "express";
import Artist from "../models/artist.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", async (req, res) => {
  const artists = await Artist.findAll();
  res.json(artists);
});

router.get("/:id", async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);
  res.json(artist);
});

// Admin routes
router.post("/", authenticate, async (req, res) => {
  const artist = await Artist.create(req.body);
  res.json(artist);
});

router.put("/:id", authenticate, async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);
  if (!artist) return res.status(404).json({ message: "Not found" });
  await artist.update(req.body);
  res.json(artist);
});

router.delete("/:id", authenticate, async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);
  if (!artist) return res.status(404).json({ message: "Not found" });
  await artist.destroy();
  res.json({ message: "Deleted" });
});

export default router;

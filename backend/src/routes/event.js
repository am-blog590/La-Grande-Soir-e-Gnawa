import express from "express";
import EventInfo from "../models/event.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const event = await EventInfo.findOne();
  res.json(event);
});

export default router;

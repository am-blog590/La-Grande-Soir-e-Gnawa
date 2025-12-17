import express from "express";
import Booking from "../models/booking.js";
import { generateCode } from "../utils/generateCode.js";

const router = express.Router();

// Créer booking
router.post("/", async (req, res) => {
  const code = generateCode();
  const booking = await Booking.create({ ...req.body, confirmationCode: code });
  res.json(booking);
});

// Rechercher par code
router.get("/:code", async (req, res) => {
  const booking = await Booking.findOne({ where: { confirmationCode: req.params.code } });
  res.json(booking);
});

// Rechercher par email
router.get("/email/:email", async (req, res) => {
  const bookings = await Booking.findAll({ where: { email: req.params.email } });
  res.json(bookings);
});

export default router;

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Admin hardcoded (يمكنك تغييره لاحقاً ل DB)
const adminUser = {
  username: "admin",
  passwordHash: bcrypt.hashSync("admin123", 10)
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username) 
    return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, adminUser.passwordHash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});

export default router;
    
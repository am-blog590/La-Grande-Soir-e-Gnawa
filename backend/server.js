import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";

import eventRoutes from "./src/routes/event.js";
import artistRoutes from "./src/routes/artists.js";
import bookingRoutes from "./src/routes/router.booking.js";
import authRoutes from "./src/routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/event", eventRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

// DB + server start
sequelize.sync().then(() => {
  console.log("DB connected");
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}).catch(err => console.log("Database connection failed:", err));

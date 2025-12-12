const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/config/database");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.get("/test-db", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", message: "DB connected" });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

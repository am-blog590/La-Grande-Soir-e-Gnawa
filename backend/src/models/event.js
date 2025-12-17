import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EventInfo = sequelize.define("EventInfo", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  date: DataTypes.STRING,
  location: DataTypes.STRING
}, { timestamps: false });

export default EventInfo;
    
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Artist = sequelize.define("Artist", {
  name: { type: DataTypes.STRING, allowNull: false },
  photo: DataTypes.STRING,
  style: DataTypes.STRING,
  schedule: DataTypes.STRING
}, { timestamps: true });

export default Artist;

import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';

const Booking = sequelize.define("Booking", {
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  tickets: { type: DataTypes.INTEGER, allowNull: false },
  confirmationCode: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { timestamps: true });

export default Booking;

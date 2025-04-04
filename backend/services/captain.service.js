const mongoose = require("mongoose");
const captainModel = require("../models/captain.model");

const createUser = async ({ firstName, lastName, email, password, vehicle }) => {
  // ✅ Validate nested vehicle fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !vehicle?.color ||
    !vehicle?.plate ||
    vehicle.capacity === undefined ||
    !vehicle?.vehicleType
  ) {
    throw new Error("All fields are required.");
  }

  // ✅ Check for existing user
  const existingUser = await captainModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use.");
  }

  // ✅ Create captain
  const captain = await captainModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    },
  });

  return captain;
};

module.exports = { createUser };

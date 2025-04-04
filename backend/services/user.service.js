const mongoose = require("mongoose");
const userModel = require("../models/user.model");

const createUser = async ({ firstName, lastName, email, password }) => {
    // ✅ Fix: Ensure all required fields are present
    if (!firstName || !email || !password) {
        throw new Error("All fields are required.");
    }

    // ✅ Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use.");
    }

    // ✅ Fix: Correct field mapping
    const user = await userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,  // Fix: Correct variable reference
        password
    });

    return user;
};

module.exports = { createUser };

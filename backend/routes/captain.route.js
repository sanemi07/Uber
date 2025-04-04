const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controllers");
const authMiddleWare = require('../middlewares/auth.middleware')
router.post("/register",[
    body("email").isEmail().withMessage("Invalid email."),
    body("fullName.firstName").isLength({ min: 3 }).withMessage("First name should be at least 3 characters."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Vehicle color should be at least 3 characters."),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Vehicle plate should be at least 3 characters."),
    body("vehicle.capacity").isLength({ min: 1 }).withMessage("Vehicle capacity should be at least 1 character."),
    body("vehicle.vehicleType").isIn(["bike", "car", "auto"]).withMessage("Invalid vehicle type."),
],captainController.registerCaptain);
router.post("/login",[
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({min:6}).withMessage("password must be of  minimun 6 characters")
],captainController.loginCaptain)
router.get("/profile",authMiddleWare.captainAuth,captainController.getCaptainProfile)  
router.post("/logout",authMiddleWare.captainAuth,captainController.logOutCaptain)



module.exports = router;
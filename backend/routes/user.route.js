const express = require("express");
const router = express.Router();
const authController = require("../controllers/user.controllers");
const { body } = require("express-validator");
const authMiddleWare=require('../middlewares/auth.middleware')

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid email."),
        body("fullName").custom((value) => {
            if (!value || typeof value !== "object" || !value.firstName || !value.lastName) {
                throw new Error("Full name must contain firstName and lastName.");
            }
            if (value.firstName.length < 3) {
                throw new Error("First name should be at least 3 characters.");
            }
            return true;
        }),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
    ],
    authController.register
);
router.post("/login",[
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({min:6}).withMessage("password must be of  minimun 6 characters")
],authController.loginUser)
router.get("/profile",authMiddleWare.authUser,authController.getUserProfile)
router.post("/logout",authMiddleWare.authUser,authController.logOutUser)

module.exports = router;

const express = require("express");
const { loginController, signUpController } = require("./user.controller");
const router = express.Router();

router.post("/user/login", loginController);
router.post("/user/signUp", signUpController);

module.exports = router;

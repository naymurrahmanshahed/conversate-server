const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
} = require("../controllers/userControllers");
const router = express.Router();

// register user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

// find user
router.get("/find/:userId", findUser);

module.exports = router;

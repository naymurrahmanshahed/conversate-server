const express = require("express");
const { registerUser } = require("../controllers/userControllers");
const router = express.Router();

// register user
router.post("/register", registerUser);

module.exports = router;

const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getAllUsers,
} = require("../controllers/userControllers");
const router = express.Router();

// register user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

// find user
router.get("/find/:userId", findUser);

//getAllUser

router.get("/", getAllUsers);

module.exports = router;

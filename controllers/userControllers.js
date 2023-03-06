const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//generate token

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
}

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userModel.register(name, email, password);

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      name,
      email,
      password: user.password,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);

    //create token

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email,
      password: user.password,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const findUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json("Invalid ID.");
  }

  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  findUser,
};

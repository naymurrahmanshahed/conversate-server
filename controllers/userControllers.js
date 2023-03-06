const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

//generate token

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
}

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.register(name, email, password);

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

module.exports = {
  registerUser,
};

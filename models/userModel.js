const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.register = async function (name, email, password) {
  // if email or password field empty

  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }

  //email validation

  if (!validator.isEmail(email)) {
    throw Error("Please Enter Valid Email");
  }

  //password validation

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Please make sure your password is at least 8 characters long and includes at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  //exist email in mongodb
  const existEmail = await this.findOne({ email });

  if (existEmail) {
    throw Error("Email Already Taken");
  }

  // password encryption

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  //create user

  const user = await this.create({ name, email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  //check empty fields
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //find user from mongdb
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("No Account Found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);

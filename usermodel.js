const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    maxlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: " passwords are not the same",
    },
  },
});

userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model("User", userschema);
module.exports = User;

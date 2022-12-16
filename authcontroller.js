const User = require("./usermodel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./catchAsync");
exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = jwt.sign({ id: newUser._id }, "my-secret-key-for-all-purpose", {
    expiresIn: "90d",
  });
  res.status(200).json({
    status: "sucess",
    token,
    data: {
      user: newUser,
    },
  });
});

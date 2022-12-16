const express = require("express");
const User = require("./usermodel");
const app = express();
const { signup } = require("./authcontroller");
app.use(express.json());
app.get("/api/v1/alluser", async (req, res) => {
  const alluser = await User.find();
  res.status(200).json({
    status: "sucess",
    data: {
      data: alluser,
    },
  });
});
app.post("/api/v1/user/signup", signup);
module.exports = app;

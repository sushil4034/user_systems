const mongoose = require("mongoose");
const app = require("./app");
mongoose
  .connect(
    "mongodb+srv://sushil:1174034@cluster0.g3tnhex.mongodb.net/UsersINfo?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connections sucessfully"))
  .catch((err) => console.log(err));

app.listen(8008, () => {
  console.log("running on 8008");
});

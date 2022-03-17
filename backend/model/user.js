const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: "Boş Bırakılamaz",
    unique: true,
  },
  password: {
    type: String,
    required: "Boş Bırakılamaz",
  },
  role: {
    type: String,
    required: "Boş Bırakılamaz",
  },
});

module.exports = mongoose.model("User", UserSchema);

const { ObjectId } = require("mongodb");
const { Schema, default: mongoose } = require("mongoose");

const UserModel = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model("User", UserModel);

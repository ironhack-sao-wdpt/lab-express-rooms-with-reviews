const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, maxlength: 500, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

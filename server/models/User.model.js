const { Schema, model } = require("mongoose");

// 1. Definir o Schema
const UserSchema = new Schema({
  name: { type: String, maxlength: 500, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  rooms: [{ type: mongoose.Types.ObjectId, ref: "Room" }],
});

module.exports = model("User", UserSchema);

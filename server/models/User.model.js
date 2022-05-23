const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, maxlength: 500, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
});

module.exports = model("User", UserSchema);

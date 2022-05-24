const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, maxlength: 300, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdRooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
});

module.exports = model("User", UserSchema);

const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, maxlength: 300, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, //mudo o nome de password para passwordHash da chave, pois aqui não fica mais guardada a senha original, mas sim a hash
  createdRooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
});

module.exports = model("User", UserSchema);

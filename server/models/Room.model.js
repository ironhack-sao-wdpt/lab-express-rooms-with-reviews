const { Schema, model } = require("mongoose");

const RoomSchema = new Schema({
  name: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  //ref para user
});

module.exports = model("Room", RoomSchema);

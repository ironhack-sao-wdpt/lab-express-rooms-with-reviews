const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  comment: { type: String, maxlength: 200 },
  roomId: { type: Schema.Types.ObjectId, ref: "Room" },
});

module.exports = model("Review", ReviewSchema);

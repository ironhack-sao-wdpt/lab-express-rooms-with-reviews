const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    comment: { type: String, maxlength: 200 },
    roomId: { type: Schema.Types.ObjectId, ref: "Room" },
  });

module.exports = model("Review", reviewSchema);
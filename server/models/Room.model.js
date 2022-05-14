const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    reviews: [], // we will update this field a bit later when we create review model
  });

module.exports = model("Room", roomSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;

const slideSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    url: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", slideSchema);

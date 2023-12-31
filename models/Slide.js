import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
  author: String,
  title: String,
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Slide = mongoose.model("Slide", slideSchema);

export default Slide;

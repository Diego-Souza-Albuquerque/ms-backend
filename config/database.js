import mongoose from "mongoose";
mongoose.Promisse = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/musicSlider")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log(err));

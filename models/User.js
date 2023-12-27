import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true, select: false },
    adm: { type: Boolean, required: true, default: false },
    /* preferences: { type: Object, default: { bgBlack: true, logo: false } }, */
  },
  { timestamps: true }
);

/* Criptografando a senha */
usersSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.password, 10); //dando 10 saltos
  this.password = hash;
});

const User = mongoose.model("User", usersSchema);

export default User;

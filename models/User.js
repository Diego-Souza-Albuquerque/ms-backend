import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: "new" },
    adm: { type: Boolean, default: false },
    preferences: {
      type: Object,
      default: { bgBlack: true, logoActive: false },
    },
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

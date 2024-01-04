import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/User.js";
import Slide from "../models/Slide.js";

export const createAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (user)
      return res.status(201).json({
        msg: "Infelizmente este email já está sendo utilizado, tente outro email!",
      });

    const User = await UserModel.create({ name, email, password });
    User.password = undefined;

    res.status(201).json({ User, msg: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editAccount = async (req, res) => {
  try {
    /*   const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);

    if (!isValidObjectId) {
      res.status(400).json({ msg: "ID de usuário inválida." });
      return;
    } */

    const user_id = req.user.id;

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const updateUser = await UserModel.findByIdAndUpdate(user_id, user);

    if (!updateUser) {
      res.status(404).json({ msg: "Usuário não encontrado." });
      return;
    }

    res.status(200).json({ user, msg: "Usuário atualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({ msg: "E-mail e/ou senha incorreta" });
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "E-mail e/ou senha incorreta",
      });
    }
    user.password = undefined; // retirando a senha pra não mostrar

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      subject: String(user.id),
      expiresIn: 86400,
    }); // gerando o token... 68400 é para expirar em 1 dia

    return res.status(200).json({ user, token, msg: "Usuário logado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const upMusic = async (req, res) => {
  try {
    const { title, author } = req.body;
    const slide = await Slide.create({
      title: title,
      author: author,
      name: req.file.originalname,
      size: req.file.size,
      key: req.file.filename,
      url: req.file.key,
    });

    return res.json(slide);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

import UserModel from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const findEspecificUser = async (req, res) => {
  try {
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);

    if (!isValidObjectId) {
      res.status(400).json({ msg: "ID de usuário inválida." });
      return;
    }

    const id = req.params.id;

    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ msg: "Usuário não encontrado." });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);

    if (!isValidObjectId) {
      res.status(400).json({ msg: "ID de usuário inválida." });
      return;
    }

    const id = req.params.id;

    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ msg: "Usuário não encontrado." });

    const deletedUser = await UserModel.findByIdAndDelete(id);

    res.status(200).json({ deletedUser, msg: "Usuário excluido" });
  } catch (error) {
    res.status(500).json({ error: err.message });
    console.log(error);
  }
};

export const updateToAdm = async (req, res) => {
  try {
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);

    if (!isValidObjectId) {
      res.status(400).json({ msg: "ID de usuário inválida." });
      return;
    }

    const id = req.params.id;
    /* const user = await UserModel.findById(id) */

    const user = {
      adm: true,
    };

    /* const { nome } = request.body; */

    const updateUser = await UserModel.findByIdAndUpdate(id, user);

    if (!updateUser) {
      res.status(404).json({ msg: "Usuário não encontrado." });
      return;
    }

    res.status(200).json({ user, msg: "Usuário virou administrador" });
  } catch (error) {
    res.status(500).json({ error: err.message });
    console.log(error);
  }
};

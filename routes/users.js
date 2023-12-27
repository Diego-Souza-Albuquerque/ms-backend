import express from "express";
const router = express.Router();

import {
  editAccount,
  createAccount,
  login,
} from "../controllers/userController.js";

import {
  getAllUsers,
  findEspecificUser,
  deleteUser,
  updateToAdm,
} from "../controllers/admController.js";

// all user routes
router.post("/createAccount", createAccount);
router.post("/login", login);
router.put("/editAccount/:id", editAccount);

//admin routes
router.get("/getAllUsers", getAllUsers);
router.get("/findEspecificUser/:id", findEspecificUser);
router.put("/updateToAdm/:id", updateToAdm);

router.delete("/deleteUser/:id", deleteUser);

export default router;

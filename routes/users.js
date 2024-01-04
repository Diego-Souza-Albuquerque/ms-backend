import express from "express";

const router = express.Router();

import { verifyToken } from "../middlewares/auth.js";
import { upMusicMulterS3 } from "../middlewares/multer.js";

import {
  editAccount,
  createAccount,
  upMusic,
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
router.post("/upMusic", upMusicMulterS3.single("file"), upMusic);
router.put("/editAccount/", verifyToken, editAccount);

//admin routes
router.get("/getAllUsers", verifyToken, getAllUsers);
router.get("/findEspecificUser/:id", findEspecificUser);
router.put("/updateToAdm/:id", updateToAdm);

router.delete("/deleteUser/:id", deleteUser);

export default router;

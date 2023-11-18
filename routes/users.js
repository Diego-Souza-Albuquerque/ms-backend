import express from "express";
const router = express.Router();

import { userController } from "../controllers/userController.js";

router
  .route("/users/register")
  .post((req, res) => userController.create(req, res));

router.route("/users/login").post((req, res) => userController.login(req, res));

export default router;

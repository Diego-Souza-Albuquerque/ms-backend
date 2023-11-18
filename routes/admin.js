import express from "express";
const router = express.Router();

import { userController } from "../controllers/userController.js";

router.route("/admin").get((req, res) => userController.getAll(req, res));

router.route("/admin/:id").get((req, res) => userController.get(req, res));

router
  .route("/admin/:id")
  .delete((req, res) => userController.delete(req, res));

router.route("/admin/:id").put((req, res) => userController.update(req, res));

export default router;

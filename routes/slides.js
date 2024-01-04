import express from "express";

const router = express.Router();

import { verifyToken } from "../middlewares/auth.js";

import { uploadSlideS3, deleteSlideS3 } from "../middlewares/multer.js";

import {
  getAllSlides,
  uploadSlide,
  deleteSlide,
  getSpecificSlide,
} from "../controllers/slideController.js";

router.post("/uploadSlide", uploadSlideS3.single("file"), uploadSlide);

router.get("/getAllSlides", getAllSlides);

router.get("/getSpecificSlide/:id", getSpecificSlide);

router.delete("/deleteSlide/:id", deleteSlideS3, deleteSlide);

export default router;

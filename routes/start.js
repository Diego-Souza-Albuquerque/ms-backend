import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).send("The API is online");
});

export default router;

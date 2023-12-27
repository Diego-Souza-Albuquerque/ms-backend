import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { verifyToken } from "./middlewares/auth.js";
import mongoose from "mongoose";

import userRoutes from "./routes/users.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors()); // declarando o cors para nosso sistema

app.use(express.json()); //permite a comunicação de dados via json
app.use(bodyParser.json());

// ROUTES

app.use("/api", userRoutes); //chamando a rota criada para users

app.listen(4000, () => {
  console.log("Servidor foi iniciado pelo express");
});

//FrontEnd na porta 3000
//BackEnd (node) na porta 4000
//Banco de dados (MongoDb) na porta 27017

mongoose
  .connect("mongodb://localhost:27017/musicSlider")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log(err));

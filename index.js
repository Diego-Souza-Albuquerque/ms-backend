import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

import userRoutes from "./routes/users.js";
import slideRoutes from "./routes/slides.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors()); // habilitando o compartilhamento de recursos com origens diferentes

app.use(express.json()); //permite a comunicação de dados via json
/* app.use(bodyParser.json());  o express.json já faz o trabalho do bodyParser.json*/

app.use(express.urlencoded({ extended: true })); //lidar com requisições url para facilitar o envio de arquivos

app.use(morgan("dev")); //responsável pelos logs (dev é em um formato mais resumido de log)

// ROUTES

app.use("/api", userRoutes); //Rota dos usuários
app.use("/api", slideRoutes); //Rota para os slides

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor foi iniciado pelo express na porta ${PORT}`);
});

//FrontEnd na porta 3000
//BackEnd (node) na porta 4000
//Banco de dados (MongoDb) na porta 27017

mongoose
  .connect("mongodb://localhost:27017/musicSlider")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log(err));

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Conexão com o MongoDB encerrada.");
    process.exit(0);
  });
});

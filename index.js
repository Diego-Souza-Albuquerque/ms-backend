import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

import userRoutes from "./routes/users.js";
import slideRoutes from "./routes/slides.js";
import startRoute from "./routes/start.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors()); // habilitando o compartilhamento de recursos com origens diferentes

app.use(express.json()); //permite a comunicação de dados via json
/* app.use(bodyParser.json());  o express.json já faz o trabalho do bodyParser.json*/

app.use(express.urlencoded({ extended: true })); //lidar com requisições url para facilitar o envio de arquivos

app.use(morgan("dev")); //responsável pelos logs (dev é em um formato mais resumido de log)

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro na conexão com o MongoDB:", err));

// ROUTES
app.use("/api", userRoutes); //Rota dos usuários
app.use("/api", slideRoutes); //Rota para os slides
app.use("/api", startRoute); //Rota para startar o Render (free)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor foi iniciado pelo express na porta ${PORT}`);
});

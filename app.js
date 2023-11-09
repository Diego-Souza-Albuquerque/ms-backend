const express = require("express");
const checkListRouter = require("./src/routes/checklist");
require("./config/database");

const app = express();

app.use(express.json());

app.use(checkListRouter);

/* app.get("/", (req, res) => {
  res.send("<h1>Meu primeiro teste</h1>");
  res.send(console.log("enviei um get"));
}); */

app.listen(4000, () => {
  console.log("Servidor foi iniciado pelo express");
});

//FrontEnd na porta 3000
//BackEnd (node) na porta 4000
//Banco de dados (MongoDb) na porta 27017

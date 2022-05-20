// 1. Importar o pacote Express
const express = require("express");
const morgan = require("morgan");

// 2. Instanciar o Express
const app = express();

// 3. Configurar o servidor para aceitar JSON
app.use(express.json());

// Configura o servidor para criar um log de cada requisição recebida
app.use(morgan("combined"));

// 5. Configurar as rotas (endpoints) de API
const roomRouter = require("./routes/room.route");
const reviewRouter = require("./routes/review.route");

//Redireciona todas as requisições para o roteador configurado no arquivo '.js'
app.use("/", roomRouter);
app.use("/", reviewRouter);

// 4. Conectar com o banco de dados
const connectToDB = require("./config/db.config");

// Só inicializa o servidor Express se a conexão com o banco for bem-sucedida
connectToDB().then(() => {
  // 6. Subir o servidor para escutar requisições na porta 4000

  app.listen(4000, () => console.log("Servidor rodando na porta ", 4000));
});

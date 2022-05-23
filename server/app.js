//1. configurar o servidor do express -> vou importar o pacote Express e o morgan do log
const express = require("express");
const morgan = require("morgan");

//2. instanciar o Express pois ele é uma função
const app = express();

//3. configurar o servidor para aceitar JSON
app.use(express.json());

//usar morgan para facilitar o log das requisições. -> aqui vou configurar o servidor para criar o log de cada req
app.use(morgan("combined"));

//5. configurar as rotas ou endpoints de API
const roomsRouter = require("./routes/rooms.route");

// use() aceita dois argumentos: 1) uma rota que ele vai escutar e 2) o roteador para o qual ele vai redirecionar as requisições que chegam nessa rota, para esse determinado roteador.
// usamos o '/' para escutar todas as requisições
//redireciona todas as requisições para o roteador configurado - no caso - no file rooms.router.js
app.use("/", roomsRouter);

//4. conectar ao banco de dados
const connectToDB = require("./config/db.config");

// chamar a função connectToDB. como ela é async, por padrão ela retorna uma promise - uso o then() para isso. tbm preciso do try-catch. entretando o catch eu uso o da própria função mesmo (db.config.js)
connectToDB().then(() => {
  // aqui eu coloco para subir o servidor. ou seja, só inicializa o servidor express, se a conexão com o bd for bem-sucedida.
  //6. Subir o servidor para escutar as requisições na porta 4000
  app.listen(4000, () => console.log("Servidor rodando na porta", 4000));
});

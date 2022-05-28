//1. imporat o pacote do mongoose
const mongoose = require("mongoose");

// vou exportar uma função para chamar ela lá no app.js ponto 4!
//Eu chamo a função para que o js consiga capturar um erro se houver e não chegar a chamar o servidor

// async pq eu vou esperar a conexão com o banco de dados
module.exports = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/roomwithreviewslab"
    );
    console.log(`Conectado ao banco: ${connection.connections[0].name}`);
  } catch (err) {
    console.error("Falha ao conectar com o MongoDB");
    console.error(err);
    //peço para encerrar a conexão com o servidor - em caso de: falhou a conexão com o BD
    process.exit(1); // foi número 1 pois é 'failure to connect to bd'. The shell that executed node should see the exit code as 1.
  }
};

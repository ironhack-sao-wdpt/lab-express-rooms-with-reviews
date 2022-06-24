const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/express_room"
    );
    console.log(`Connectado ao Banco ${connection.connections[0].name}`);
  } catch (err) {
    console.error("Falha ao conectar ao Banco de Dados");
    console.error(err);
    process.exit(1);
  }
};

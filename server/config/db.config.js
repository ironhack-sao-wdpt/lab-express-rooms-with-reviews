const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/room-db"
    );
    console.log("Conectado ao banco: ", connection.connections[0].name);
  } catch (error) {
    console.log("falha ao conectar com o DB");
    console.error(error);

    process.exit(1);
  }
};

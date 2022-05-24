const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/server-rooms-app"
    );
    console.log(`Conectado ao banco: ${connection.connections[0].name}`);
  } catch (err) {
    console.log("Falha ao conectar com o MongoDB!");
    console.log(err);
    process.exit(1);
  }
};

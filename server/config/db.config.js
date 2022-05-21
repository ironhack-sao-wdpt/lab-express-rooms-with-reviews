const mongoose = require("mongoose");

module.exports = async () => {
  try {
      const connection = await mongoose.connect('mongodb://localhost:27017/express-rooms')
      console.log(connection.connections[0].name)

  } catch (err) {
    console.error("Falha ao conectar com o MongoDB ");
    console.error(err);
    process.exit(1);
  }
};

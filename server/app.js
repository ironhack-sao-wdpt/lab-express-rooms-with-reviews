const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(morgan("combined"));

const roomRouter = require("./routes/room.route");
app.use("/", roomRouter);

const connectToDB = require("./config/db.config");

connectToDB().then(() => {
  app.listen(4000, () => console.log("Servidor conectado na porta ", 4000));
});

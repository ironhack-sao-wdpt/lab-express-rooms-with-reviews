require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(morgan("combined"));

const roomRouter = require("./routes/room.route");
const userRouter = require("./routes/user.route");

app.use("/", roomRouter);
app.use("/", userRouter);

const connectToDB = require("./config/db.config");

connectToDB().then(() => {
  app.listen(4000, () => console.log("Servidor conectado na porta ", 4000));
});

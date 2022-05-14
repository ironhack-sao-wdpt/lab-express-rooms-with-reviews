const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("combined"));

const authRouter = require("./routes/auth.route");
app.use("/", authRouter);

const reviewsRouter = require("./routes/reviews.route");
app.use("/", reviewsRouter);

const roomsRouter = require("./routes/rooms.route");
app.use("/", roomsRouter);

const userRouter = require("./routes/user.route");
app.use("/", userRouter);

const connectToDb = require("./config/db.config");

connectToDb().then(() => {
  app.listen(4000, () => console.log("Servidor rodando na porta ", 4000));
});

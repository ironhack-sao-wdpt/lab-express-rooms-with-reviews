require("dotenv").config();
const cors = require("cors");

const express = require("express");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const userRouter = require("./routes/user.route");
app.use("/", userRouter);
const roomRouter = require("./routes/room.route");
app.use("/", roomRouter);
const reviewRouter = require("./routes/review.route");
app.use("/", reviewRouter);

const connectToDb = require("./config/db.config");
connectToDb().then(() => {
  app.listen(4000, () => console.log("servidor rodando na porta 4000"));
});

const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("combined"));

const roomRouter = require("./routes/rooms.route");
const reviewsRouter = require("./routes/reviews.route");
const authRouter = require("./routes/auth.route");

app.use("/", roomRouter);
app.use("/", reviewsRouter);
app.use("/", authRouter);

const connectToDB = require("./config/db.config");

connectToDB().then(() => {
  app.listen(4000, () => console.log("Server running on port ", 4000));
});

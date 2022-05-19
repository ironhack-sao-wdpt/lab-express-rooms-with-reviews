const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("combined"));

const roomRouter = require("./routes/rooms.route");
const reviewsRouter = require("./routes/reviews.route");

app.use("/", roomRouter);
app.use("/", reviewsRouter);

const connectToDB = require("./config/db.config");

connectToDB().then(() => {
  app.listen(4000, () => console.log("Server running on port ", 4000));
});

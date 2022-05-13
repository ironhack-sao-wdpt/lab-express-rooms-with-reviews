const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("combined"));

const roomRouter = require("./routes/rooms.route");
app.use("/", roomRouter);

const reviewsRouter = require("./routes/reviews.route");
// Pra onde eu vou redirecionar as requisições agora que tenho 2 roteadores?
app.use("/", reviewsRouter);

const connectToDB = require("./config/db.config");

connectToDB().then(() => {
  app.listen(4000, () => console.log("Server running on port ", 4000));
});

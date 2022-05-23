const { application } = require("express");

// importar o roteador do express + invocar a classe Router()
const router = require("express").Router();

// configurar rotas da API

router.get("/hello", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});

module.exports = router;

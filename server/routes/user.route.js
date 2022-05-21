const router = require("express").Router();
const gerartoken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const result = await UserModel.create({ name, email, passwordHash: hash });

    return res.status(201).json({ msg: "usuário criado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Não foi possivel salvar o usuário" });
  }
});

router.get("/profile/", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.user;
    const result = await UserModel.findOne({ _id });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Não foi possivel salvar o usuário" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //1. verificar usuário existe
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "usuário não cadastrado" });
    }
    //2. verificar senhas coincidem
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({ msg: "senha incorreta" });
    }
    //3. assinar token e enviar sucesso login
    const token = gerartoken(user);
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Não foi possivel realizar o login" });
  }
});

module.exports = router;

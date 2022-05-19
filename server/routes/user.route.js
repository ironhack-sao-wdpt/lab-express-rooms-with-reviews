const router = require("express").Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/User.model");
const saltRounds = 10;

const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);

    const hash = bcrypt.hashSync(password, salt);

    const result = await UserModel.create({ name, email, passwordHash: hash });

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Não foi possível salvar o usuário" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "E-mail ou senha incorretos" });
    }

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({ msg: "E-mail ou senha incorretos" });
    }

    const token = generateToken(user);

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Não foi possível realizar o login" });
  }
});

router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.user;

    const result = await UserModel.findOne({ _id });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Não foi possível salvar o usuário" });
  }
});

module.exports = router;

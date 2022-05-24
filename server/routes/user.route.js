const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserModel = require("../models/User.model");
const ReviewModel = require("../models/Review.model");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);

    const hash = bcrypt.hashSync(password, salt);

    const result = await UserModel.create({ name, email, passwordHash: hash });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao criar usuário" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Email ou senha incorretos" });
    }

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({ msg: "Email ou senha incorretos" });
    }

    const token = generateToken(user);

    return res
      .status(200)
      .json({
        token: token,
        user: { _id: this.user._id, name: user.name, email: user.email },
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao logar usuário" });
  }
});

router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.user;
    const result = await UserModel.findOne({ _id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao encontrar usuário" });
  }
});

router.delete("/user/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await UserModel.deleteOne({ _id });

    if (!result.deletedCount) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao deletar usuário" });
  }
});

module.exports = router;

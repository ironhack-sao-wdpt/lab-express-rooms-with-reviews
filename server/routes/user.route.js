const router = require("express").Router();
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

router.get("/profile/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await UserModel.findOne({ _id });

    return res.status(201).json({ msg: "usuário criado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Não foi possivel salvar o usuário" });
  }
});

module.exports = router;

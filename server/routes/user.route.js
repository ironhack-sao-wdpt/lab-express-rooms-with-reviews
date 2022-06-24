const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const ReviewModel = require("../models/Review.model");
const RoomModel = require("../models/Room.model");
const UserModel = require("../models/User.model");
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
    return res.status(500).json({ msg: "Não foi possível cadastrar usuário" });
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

    const result = await UserModel.findOne({ _id })
      .populate("rooms")
      .populate("reviews");

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Não foi possível salvar o usuário" });
  }
});

router.delete("/user/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await UserModel.deleteOne({ _id });

    if (!result.deletedCount) {
      return res.status(404).json({ msg: "Usuário inexistente" });
    }

    const roomsResult = await RoomModel.deleteMany({ userId: _id });
    const reviewsResult = await ReviewModel.deleteMany({ userId: _id });

    console.log("USER DELETE => ", result);
    console.log("ROOMS DELETE => ", roomsResult);
    console.log("REVIEWS DELETE => ", reviewsResult);

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Não foi possível salvar o usuário" });
  }
});

module.exports = router;

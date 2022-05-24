const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/User.model");
const generateToken = require("../config/jwt.config");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const result = await User.create({ name, email, passwordHash: hash });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "User signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const token = generateToken(user);

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Login failed" });
  }
});

module.exports = router;

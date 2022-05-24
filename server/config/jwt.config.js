const jwt = require("jsonwebtoken");

function generateToken({ _id, name, email }) {
  return jwt.sign({ _id, name, email }, process.env.TOKEN_SIGN_SECRET, {
    expiresIn: "2h",
  });
}
module.exports = generateToken;

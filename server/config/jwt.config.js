const jwt = require("jsonwebtoken");

function generateToken({ _id, name, email }) {
  console.log(process.env.TOKEN_SIGN_SECRET, { _id, name, email });
  return jwt.sign({ _id, name, email }, process.env.TOKEN_SIGN_SECRET, {
    expiresIn: "6h",
  });
}

module.exports = generateToken;

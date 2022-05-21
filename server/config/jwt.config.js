const jwt = require("jsonwebtoken");

function gerartoken({ _id, name, email }) {
  //1. definir payload
  //2. qual senha
  //3. data de validade token

  return jwt.sign({ _id, name, email }, process.env.TOKEN_SIGN_SECRET, { expiresIn: "6h" });
}
module.exports = gerartoken;

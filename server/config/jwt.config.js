const jwt = require("jsonwebtoken");

function generateToken({ _id, name, email }) {
  // para a biblioteca conseguir gerar um token, ela precisa das seguintes infos:
  // 1. Definir o payload (_id, name, email e data de expiração) - parte do meio do token no jwt
  // 2. Qual a senha pra fazer a assinatura
  // 3. Qual a data de validade desse token?

  // primeiro argumento da sing() é o objeto que é o payload. e o segundo é a senha!
  // OBS.: O token sign secret (senha de assinatura) é uma informação secreta e sensível e NUNCA deve ser enviada para o Github. Por isso estamos armazenando essa informação em variáveis de ambiente
  // o terceiro argumento é o tempo de expiração -> verificar documentação para entender unidades de tempo

  return jwt.sign({ _id, name, email }, process.env.TOKEN_SIGN_SECRET, {
    expiresIn: "6h",
  });
}

module.exports = generateToken;

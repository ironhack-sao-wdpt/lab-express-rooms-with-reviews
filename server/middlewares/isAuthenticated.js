const jwt = require("jsonwebtoken");

// é o mesmo req e res que usamos de argumento nas callbacks das requisições das rotas.

function extractTokenFromHeaders(req, res) {
  const Authorization = req.headers.authorization;

  if (!Authorization) {
    return res.status(401).json({ msg: "Missing Authorization Header" });
  }

  // o Bearer <token> eu não preciso do Bearer e do espacinho entre o Bearer e o token. Por isso eu utilizo o split(" ")[1]
  // - retorno do split é uma array de dois elementos: o índice 0 sendo Bearer e índice 1 sendo o token em si
  const token = Authorization.split(" ")[1];

  return token;
}

module.exports = function (req, res, next) {
  // 1. Extrair o token do cabeçalho

  const token = extractTokenFromHeaders(req, res);

  // 2. Validar o token
  // as coisas se conectam aqui. eu uso a sign-secret(senha) para assinar o token na hora que eu emito ele E uso a senha para validar o token previamente emitido
  //somente um token emitido por mim, passa por essa verificação. isso que garante a segurança desses tokens
  //tbm já bloqueia os tokens expirados
  //esta função retorna boolean - true or false

  // recebe três argumentos. token, senha e uma callback (com erro e token decodificado)
  jwt.verify(token, process.env.TOKEN_SIGN_SECRET, (err, decoded) => {
    // 3. Se o token for inválido, retorne um erro de autenticação
    if (err) {
      return res.status(401).json({ msg: err });
    }

    // 4. Se for válido, passe para a próxima função handler de rota
    // estou 'jogando' as informações do decoded em um objeto user dentro do req
    req.user = decoded; //decoded é a parte interpretada do payload do jwt
    next(); // chamo o método next() que é justamente o "passe para a próxima função handler de rota"
  });
};

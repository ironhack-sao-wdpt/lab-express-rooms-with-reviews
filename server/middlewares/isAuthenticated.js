const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //extrair token cabeçalho
  const Authorization = req.headers.authorization;
  if (!Authorization) {
    return res.status(401).json({ msg: "Falta cabeçalho de autorização" });
  }
  const token = Authorization.split(" ")[1];
  console.log(process.env.TOKEN_SIGN_SECRET);
  //validar token
  jwt.verify(token, process.env.TOKEN_SIGN_SECRET, (err, decoded) => {
    //se o token for invalido, retornar erro
    if (err) {
      return res.status(401).json({ msg: err });
    }

    //se o token for valido, seguir proxima função handler de rota
    req.user = decoded;
    next();
  });
};

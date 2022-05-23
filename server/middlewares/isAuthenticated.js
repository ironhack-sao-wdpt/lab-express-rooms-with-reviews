const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const Authorization = req.headers.authorization;

  if (!Authorization) {
    return res
      .status(401)
      .json({ msg: "Cabeçalho de autorização não encontrado" });
  }

  const token = Authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SIGN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: err });
    }

    req.user = decoded;

    next();
  });
};

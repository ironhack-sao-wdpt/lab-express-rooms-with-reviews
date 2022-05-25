const jwt = require("jsonwebtoken");

function extractTokenFromHeaders(req, res) {
  const Authorization = req.headers.authorization;

  if (!Authorization) {
    return res.status(401).json({ msg: "Faltando cabeçalho de autorização" });
  }

  const token = Authorization.split(" ")[1];
  console.log(Authorization);
  return token;
}

module.exports = function (req, res, next) {
  const token = extractTokenFromHeaders(req, res);

  jwt.verify(token, process.env.TOKEN_SIGN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: err });
    }

    req.user = decoded;
    next();
  });
};

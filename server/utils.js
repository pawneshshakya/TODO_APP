const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SaltRound = 10;
const privateKey = "#(*Y*(#@$J#$R%";

const encryptPass = async (password) => {
  console.log(password, "-----------------------------");
  const hash = await bcrypt.hashSync(password, SaltRound);
  console.log(hash, "=======================");
  return hash;
};

const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, privateKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const jwtEncode = async (data) => {
  const token = await jwt.sign(data, privateKey, {
    expiresIn: "24h",
  });
  return token;
};

const jwtDecode = async (token) => {
  const decode = await jwt.decode(token, privateKey);
  return decode;
};

module.exports = {
  encryptPass,
  compare,
  authenticateJWT,
  jwtEncode,
  jwtDecode,
};

const jwt = require("jsonwebtoken");
const fs = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);

const findIfUser = (req, res, next) => {
  if (req.body.token) {
    try {
      const data = jwt.verify(req.body.token, process.env.JWTSECRET);
      res.locals.user = data.user;
    } catch (err) {}
  }
  next();
};

const validateUser = (req, res, next) => {
  const token = req.body.token;
  if (!token)
    return res.status(403).send({ success: false, message: "No token." });

  jwt.verify(token, process.env.JWTSECRET, (err, data) => {
    if (err)
      return res.status(403).json({ success: false, message: "Bad token." });
    res.locals.user = data.user;
    next();
  });
};

const validateAdmin = (req, res, next) => {
  if (!res.locals.user.admin)
    return res.json({ success: false, message: "Not admin." });
  next();
};

module.exports = {
  findIfUser,
  validateUser,
  validateAdmin,
  readFileAsync
};

const jwt = require('jsonwebtoken');
const { config } = require("dotenv");
config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, process.env.APP_PROD_TOKEN_AUTH)

    req.body = { ...req.body, ...decoded.user };
    req.ID_USER = req.body.ID_USUARIOS;
    next();
  } catch (err) {
    return res.status(err.status || 500).json({ ...err, status: 500 })
  }
}

module.exports = auth
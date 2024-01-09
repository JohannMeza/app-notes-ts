const jwt = require('jsonwebtoken');
const { config } = require("dotenv");
const { tokenAuth } = require('../config/config');
config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, tokenAuth)

    req.body = { 
      ...req.body, 
      userId: decoded.user.id ,
      username: decoded.user.username, 
      password: decoded.user.password 
    };
    next();
  } catch (err) {
    return res.status(err.status || 500).json({ ...err, status: 500 })
  }
}

module.exports = auth
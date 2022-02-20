const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRETKEY = "SECRET"

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

const signPayload = (payload) => {
  return jwt.sign(payload, SECRETKEY);
}

const verifyToken = (payload) => {
  return jwt.verify(payload, SECRETKEY);
}

module.exports = {hashPassword, comparePassword, signPayload, verifyToken};

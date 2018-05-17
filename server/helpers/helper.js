const secret = process.env.JWT_SECRET_KEY;

const jwt = require('jsonwebtoken');

module.exports = {
  rand: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9),

  createToken: (user, expiryTime) =>
    jwt.sign(user, secret, { expiresIn: expiryTime })
};


const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
  const token = req.body.token
    || req.query.token
    || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(403).json({
          message: 'Failed to authenticate token.'
        });
      }
      req.user = decoded.userDetails;
      next();
    });
  } else {
    return res.status(200).json({
      message: 'No token provided.'
    });
  }
};


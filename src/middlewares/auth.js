const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'JWT token was not provided or is invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ msg: 'Invalid token' });
    req.user = user;
    next();
  });
}

async function authAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ msg: 'Access Denied' });
  }
  next();
}

module.exports = { authMiddleware, authAdmin };

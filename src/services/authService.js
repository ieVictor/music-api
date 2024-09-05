const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

class AuthService {
  static async authenticate(user_name, password) {
    try {
      const user = await User.findOne({
        where: { username: user_name },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { status: false, token: null };
      }

      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );

      return { status: true, token };
    } catch (error) {
      console.error('Error on user authentication: ', error);
      return { status: false, token: null };
    }
  }
}

module.exports = AuthService;

const AuthService = require('../services/authService');

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;
    const { status, token } = await AuthService.authenticate(username, password);
    if (!status || !token) return res.status(401).json({ msg: 'Invalid Credentials' });
    return res.status(200).json({ msg: "Success!", token: token });
  }
}

module.exports = AuthController;
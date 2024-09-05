const UserService = require('../services/userService');
const isValidUID = require('../utils/validate');

class UserController {
  static async getUsers(req, res) {
    const { users, error: getUsersError } = await UserService.getUsers();
    if (getUsersError) return res.status(500).json({ msg: getUsersError });

    res.status(200).json(users);
  }

  static async createUser(req, res) {
    const { username, password } = req.body;

    const { createdUserId, error: createUserError } =
      await UserService.createUser(username, password);
    if (createUserError) return res.status(400).json({ msg: createUserError });
    if (!createdUserId || createdUserId === '')
      return res.status(404).json({ msg: 'No data found' });

    const { user, error: getUserError } = await UserService.getUserById(
      createdUserId
    );
    if (getUserError) return res.status(400).json({ msg: getUserError });
    if (!user) res.status(404).json({ msg: 'No data found' });

    return res.status(200).json(user);
  }

  static async updateUser(req, res) {
    const userId = req.params.userId;
    const data = req.body;
    console.log(data);

    if (!isValidUID(userId))
      return res.status(400).json({ msg: 'Invalid user ID' });

    const { user, error: getUserError } = await UserService.getUserById(userId);
    if (getUserError) return res.status(404).json({ msg: getUserError });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const { updatedUser, error: updateUserError } = await UserService.updateUser(userId, data);
    if (updateUserError) return res.status(500).json({ msg: updateUserError });
    if (!updatedUser) return res.status(404).json({ msg: 'No data found' });

    return res.status(200).json(updatedUser);
  }

  static async deleteUser(req, res) {
    const userId = req.params.userId;
    console.log(userId);
    if (!isValidUID(userId))
      return res.status(400).json({ msg: 'Invalid user ID' });

    const { user, error: getUserError } = await UserService.getUserById(userId);
    if (getUserError) return res.status(404).json({ msg: getUserError });
    if (!user) return res.status(404).json({ msg: 'No data found' });

    const { deletedUser, error: deletedUserError } = await UserService.deleteUser(userId);
    if (!deletedUser) return res.status(404).json({ msg: 'No data found '});
    if (deletedUserError) return res.status(500).json({ msg: deletedUserError });
    return res.status(200).json({ msg: "Sucessfully deleted" });
  }
}

module.exports = UserController;

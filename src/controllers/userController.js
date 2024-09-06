const UserService = require('../services/userService');
const MusicService = require('../services/musicService');

class UserController {
  static async getUsers(req, res) {
    const { page = 1, limit = 5 } = req.query;
    const { users, error: getUsersError } = await UserService.getUsers(
      Number(limit),
      Number(page)
    );
    if (getUsersError) return res.status(500).json({ msg: getUsersError });

    res.status(200).json({
      totalUsers: users.count,
      totalPages: Math.ceil(users.count / limit),
      page: Number(page),
      limit: Number(limit),
      data: users.rows,
    });
  }

  static async getUserById(req, res) {
    const { page = 1, limit = 5 } = req.query;
    const userId = req.params.userId;

    if (!userId) res.status(403).json({ msg: 'Please provide a user id!' });

    const { user, error: getUserError } = await UserService.getUserById(userId);
    if (!user) return res.status(500).json({ msg: 'No data found' });
    const { musics, error: getMusicsError } = await MusicService.getUserMusics(
      user.id,
      Number(limit),
      Number(page)
    );

    if (getUserError) return res.status(500).json({ msg: getUserError });
    if (getMusicsError) return res.status(500).json({ msg: getMusicsError });

    res.status(200).json({
      username: user.username,
      musics: {
        totalMusics: musics.count,
        totalPages: Math.ceil(musics.count / limit),
        page: Number(page),
        limit: Number(limit),
        data: musics.rows,
      },
    });
  }

  static async getUserFavoriteMusics(req, res) {
    const { page = 1, limit = 5 } = req.query;
    const userId = req.user.id;
    if (!userId)
      return res
        .status(401)
        .json({ msg: 'You need to be logged in to acesss this feature!' });

    const { musics, error: getMusicsError } =
      await UserService.getUserFavoriteMusics(
        userId,
        Number(limit),
        Number(page)
      );
    if (getMusicsError) return res.status(500).json({ msg: getMusicsError });

    res.status(200).json({
      totalMusics: musics.count,
      totalPages: Math.ceil(musics.count / limit),
      page: Number(page),
      limit: Number(limit),
      data: musics.rows,
    });
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

    return res.status(201).json(user);
  }

  static async createAdmin(req, res) {
    const { username, password } = req.body;

    const { createdAdminId, error: createAdminError } =
      await UserService.createAdmin(username, password);
    if (createAdminError)
      return res.status(400).json({ msg: createAdminError });
    if (!createdAdminId || createdAdminId === '')
      return res.status(404).json({ msg: 'No data found' });

    const { user, error: getUserError } = await UserService.getUserById(
      createdAdminId
    );
    if (getUserError) return res.status(400).json({ msg: getUserError });
    if (!user) res.status(404).json({ msg: 'No data found' });

    return res.status(200).json(user);
  }

  static async updateUser(req, res) {
    const userId = req.params.userId;
    const creator = req.user;
    const data = req.body;

    const { user, error: getUserError } = await UserService.getUserById(userId);
    if (getUserError) return res.status(404).json({ msg: getUserError });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (creator.id !== user.id && !creator.isAdmin)
      return res
        .status(403)
        .json({ msg: 'You cannot change informations of another user!' });

    const { updatedUser, error: updateUserError } =
      await UserService.updateUser(userId, data);
    if (updateUserError) return res.status(500).json({ msg: updateUserError });
    if (!updatedUser) return res.status(404).json({ msg: 'No data found' });

    return res.status(200).json(updatedUser);
  }

  static async deleteUser(req, res) {
    const userId = req.params.userId;
    const claimer = req.user;

    const { user, error: getUserError } = await UserService.getUserById(userId);
    if (getUserError) return res.status(404).json({ msg: getUserError });
    if (!user) return res.status(404).json({ msg: 'No data found' });

    if (claimer.id !== user.id && !claimer.isAdmin)
      return res
        .status(403)
        .json({ msg: 'You cannot delete informations of another user!' });

    if (user.isAdmin)
      return res.status(403).json({ msg: "You can't delete an admin" });

    const { deletedUser, error: deletedUserError } =
      await UserService.deleteUser(userId);
    if (!deletedUser) return res.status(404).json({ msg: 'No data found ' });
    if (deletedUserError)
      return res.status(500).json({ msg: deletedUserError });
    return res.status(200).json({ msg: 'Sucessfully deleted' });
  }
}

module.exports = UserController;

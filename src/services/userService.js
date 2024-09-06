const User = require('../models/UserModel');
const Music = require('../models/MusicModel');
const bcrypt = require('bcrypt');

class UserService {
  static async getUsers(limit, skip) {
    const limitAllowed = [5, 10, 30];
    if (!limitAllowed.includes(limit)) limit = 5;
    const offset = (skip - 1) * limit;

    try {
      const users = await User.findAndCountAll({
        limit,
        skip,
      });
      return { users, error: null };
    } catch (error) {
      console.error('Error retrieving users: ', error);
      return { users: null, error: 'Internal Server Error' };
    }
  }

  static async getUserById(user_id) {
    try {
      const user = await User.findOne({ where: { id: user_id } });
      if (!user) return { user: null, error: null };
      return { user, error: null };
    } catch (error) {
      console.error('Error retrieving user by id: ', error);
      return { user: null, error: 'Internal Server Error' };
    }
  }

  static async getUserFavoriteMusics(user_id, limit, skip) {
    const limitAllowed = [5, 10, 30];
    if (!limitAllowed.includes(limit)) limit = 5;
    const offset = (skip - 1) * limit;

    try {
      const musics = await Music.findAndCountAll({
        where: { userId: user_id, favorite: true },
        limit: limit,
        offset
      })
      return { musics, error: null };
    } catch (error) {
      console.error("Error retrieving user favorite musics: ", error);
      return { musics: null, error: 'Internal Server Error' };
    }
  }

  static async createUser(username, password) {
    try {
      const user = await User.create({
        username,
        password,
        isAdmin: false,
      });
      return { createdUserId: user.id, error: null };
    } catch (error) {
      console.error('Error creating user: ', error);
      return { createdUserId: null, error: 'Internal Server Error' };
    }
  }

  static async createAdmin(username, password) {
    try {
      const user = await User.create({
        username,
        password,
        isAdmin: true,
      });
      return { createdAdminId: user.id, error: null };
    } catch (error) {
      console.error('Error creating admin user: ', error);
      return { createdAdminId: null, error: 'Internal Server Error' };
    }
  }

  static async updateUser(user_id, data) {
    try {
      const { username, password } = data;
      const newPassword = await bcrypt.hash(password, 10);
      const user = await User.findOne({ where: { id: user_id } });
      user.set({ username, password: newPassword });
      await user.save();
      return { updatedUser: user, error: null };
    } catch (error) {
      console.error('Error updating user: ', error);
      return { updatedUser: null, error: 'Internal Server Error' };
    }
  }

  static async deleteUser(user_id) {
    try {
      const user = await User.destroy({ where: { id: user_id } });
      return { deletedUser: user, error: null };
    } catch (error) {
      console.error('Error deleting user: ', error);
      return { deletedUser: null, error: 'Internal Server Error' };
    }
  }
}

module.exports = UserService;

const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

class UserService {
  static async getUsers() {
    try {
      const users = await User.findAll();
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

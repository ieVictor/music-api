const Music = require('../models/MusicModel');
const sequelize = require('../config/database');

class MusicService {
  static async getUserMusics(user_id, limit, skip) {
    const limitAllowed = [5, 10, 30];
    if (!limitAllowed.includes(limit)) limit = 5;
    const offset = (skip - 1) * limit;

    try {
      const musics = await Music.findAndCountAll({
        where: { userId: user_id },
        association: 'user',
        limit,
        offset,
      });
      return { musics, error: null };
    } catch (error) {
      console.error('Error retrieving music: ', error);
      return { musics: null, error: 'Internal Server Error' };
    }
  }

  static async getAllMusics(limit, skip) {
    const limitAllowed = [5, 10, 30];
    if (!limitAllowed.includes(limit)) limit = 5;
    const offset = (skip - 1) * limit;

    try {
      const musics = await Music.findAndCountAll({
        limit,
        offset,
      });
      return { musics, error: null };
    } catch (error) {
      console.error('Error retrieving music: ', error);
      return { musics: null, error: 'Internal Server Error' };
    }
  }

  static async getMusicById(music_id) {
    try {
      const music = await Music.findOne({
        where: { id: music_id },
      });
      return { music, error: null };
    } catch (error) {
      console.error('Error when searching for music by ID: ', error);
      return { music: null, error: 'Internal server error' };
    }
  }

  static async createMusic(data, userId) {
    try {
      const { name, description, link } = data;
      const music = await Music.create({
        name,
        description,
        link,
        userId,
      });
      return { createdMusicId: music.id, error: null };
    } catch (error) {
      console.error('Error creating song: ', error);
      return { createdMusicId: null, error: 'Internal server error' };
    }
  }

  static async updateMusic(music_id, data, user_id) {
    try {
      const { name, description, link } = data;

      const music = await Music.findOne({
        where: { id: music_id, userId: user_id },
        association: 'user',
      });
      music.set({ name, description, link });
      await music.save();
      return { updatedMusic: music, error: null };
    } catch (error) {
      console.log('Error updating music:', error);
      return { updatedMusic: null, error: 'Internal server error' };
    }
  }

  static async deleteMusic(music_id, user_id) {
    try {
      const music = await Music.destroy({
        where: { id: music_id, userId: user_id },
        association: 'user',
      });
      return { deletedMusic: music, error: null };
    } catch (error) {
      console.error('Error deleting song:', error);
      return { deletedMusic: null, error: 'Internal server error' };
    }
  }
}

module.exports = MusicService;

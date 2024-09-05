const Music = require('../models/MusicModel');
const sequelize = require('../config/database');

class MusicService {
  static async getMusics(user_id) {
    try {
      const musics = await Music.findAll({
        where: { userId: user_id },
        association: 'user',
      });
      return { musics, error: null };
    } catch (error) {
      console.error('Error retrieving music: ', error);
      return { musics: null, error: 'Internal Server Error' };
    }
  }

  static async getAllMusics() {
    try {
      const musics = await Music.findAll();
      return { musics, error: null };
    } catch (error) {
      console.error('Error retrieving music: ', error);
      return { musics: null, error: 'Internal Server Error' };
    }
  }

  static async getMusicById(music_id, user_id) {
    try {
      const music = await Music.findOne({
        where: {
          id: music_id,
          userId: user_id,
        },
        association: 'user',
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
      return { deletedMusic: music, error: null };
    } catch (error) {
      console.log('Error updating music:', error);
      return { deletedMusic: null, error: 'Internal server error' };
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

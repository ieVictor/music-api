const MusicService = require('../services/musicService');
const isValidUID = require('../utils/validate');

class MusicController {
  static async getAllMusics(req, res) {
    const { page = 1, limit = 5 } = req.query;
    const { musics, error: getMusicsError } = await MusicService.getAllMusics(
      limit,
      page
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

  static async getUserMusics(req, res) {
    const { page = 1, limit = 5 } = req.query;
    const id = req.query.id;

    const { musics, error: getMusicsError } = await MusicService.getUserMusics(
      id,
      limit,
      page
    );
    if (!musics) return res.status(404).json({ msg: 'No data found' });
    if (getMusicsError) return res.status(500).json({ msg: getMusicsError });
    res.status(200).json({
      totalMusics: musics.count,
      totalPages: Math.ceil(musics.count / limit),
      page: Number(page),
      limit: Number(limit),
      data: musics.rows,
    });
  }

  static async getMusicById(req, res) {
    const musicId = req.params.musicId;

    const { music, error: getMusicError } = await MusicService.getMusicById(
      Number(musicId)
    );
    if (!music) return res.status(404).json({ msg: 'No data found' });
    if (getMusicError) return res.status(500).json({ msg: getMusicError });
    res.status(200).json(music);
  }

  static async createMusic(req, res) {
    const user = req.user;
    const data = req.body;

    const { createdMusicId, error: createMusicError } =
      await MusicService.createMusic(data, user.id);
    if (createMusicError)
      return res.status(500).json({ msg: createMusicError });
    if (!createdMusicId) return res.status(404).json({ msg: 'No data found' });

    const { music, error: getMusicError } = await MusicService.getMusicById(
      Number(createdMusicId)
    );
    if (getMusicError) return res.status(500).json({ msg: getMusicError });
    res.status(200).json(music);
  }

  static async updateMusic(req, res) {
    const musicId = req.params.id;
    const user = req.user;
    const data = req.body;

    if(!musicId) return res.status(400).json({ msg: 'Please provide a music id!'})

    const { updatedMusic, error: updatedSongError } =
      await MusicService.updateMusic(musicId, data, user.id);
    if (!updatedMusic) return res.status(404).json({ msg: 'No data found' });
    if (updatedSongError)
      return res.status(500).json({ msg: updatedSongError });
    res.status(200).json(updatedMusic);
  }

  static async deleteMusic(req, res) {
    const musicId = req.params.id;
    const user = req.user;

    if(!musicId) return res.status(400).json({ msg: 'Please provide a music id!'})

    const { deletedMusic, error: removeSongError } =
      await MusicService.deleteMusic(musicId, user.id);
    if (!deletedMusic) return res.status(404).json({ msg: 'No data found' });
    if (removeSongError) return res.status(500).json({ msg: removeSongError });
    res.status(200).json({ msg: 'Music sucessfully deleted!' });
  }
}

module.exports = MusicController;

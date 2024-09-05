const MusicService = require('../services/musicService');
const isValidUID = require('../utils/validate');

class MusicController {
  static async getAllMusics(req, res) {
    const { musics, error: getMusicsError } = await MusicService.getAllMusics();
    if (getMusicsError) return res.status(500).json({ msg: getMusicsError });
    res.status(200).json(musics);
  }

  static async getMusics(req, res) {
    const userId = req.params.userId;

    if (!isValidUID(userId))
      return res.status(400).json({ msg: 'Invalid user ID' });
    const { musics, error: getMusicsError } = await MusicService.getMusics(
      userId
    );
    if (!musics) return res.status(404).json({ msg: 'No data found' });
    if (getMusicsError) return res.status(500).json({ msg: getMusicsError });
    res.status(200).json(musics);
  }

  static async getMusicById(req, res) {
    const userId = req.query.userId;
    const musicId = req.params.musicId;

    if (!isValidUID(userId))
      return res.status(400).json({ msg: 'Invalid user ID' });
    if (!isValidUID(musicId))
      return res.status(400).json({ msg: 'Invalid music ID' });

    const { music, error: getMusicError } = await MusicService.getMusicById(
      musicId,
      userId
    );
    if (!music) return res.status(404).json({ msg: 'No data found' });
    if (getMusicError) return res.status(500).json({ msg: getMusicError });
    res.status(200).json(music);
  }

  static async createMusic(req, res) {
    const userId = req.query.userId;
    const data = req.body;

    if (!isValidUID(userId)) res.status(400).json({ msg: 'Invalid user ID' });

    const { createdMusicId, error: createMusicError } =
      await MusicService.createMusic(data, userId);
    if (createMusicError)
      return res.status(500).json({ msg: createMusicError });
    if (!createdMusicId) return res.status(404).json({ msg: 'No data found' });

    const { music, error: getMusicError } = await MusicService.getMusicById(
      createdMusicId,
      userId
    );
    if (getMusicError) return res.status(500).json({ msg: getMusicError });
    res.status(200).json(music);
  }

  static async updateMusic(req, res) {
    const userId = req.query.userId;
    const musicId = req.params.musicId;
    const data = req.body;

    if (!isValidUID(userId))
      return res.status(400).json({ msg: 'Invalid user ID' });
    if (!isValidUID(musicId))
      return res.status(400).json({ msg: 'Invalid music ID' });

    const { updatedMusic, error: updatedSongError } =
      await MusicService.updateMusic(musicId, data, userId);
    if (!updatedMusic) return res.status(404).json({ msg: 'No data found' });
    if (updatedSongError)
      return res.status(500).json({ msg: updatedSongError });
    res.status(200).json(updatedMusic);
  }

  static async deleteMusic(req, res) {
    const userId = req.query.userId;
    const musicId = req.params.musicId;

    if (!isValidUID(userId))
      return res.status(400).json({ msg: 'Invalid user ID' });
    if (!isValidUID(musicId))
      return res.status(400).json({ msg: 'Invalid music ID' });

    const { deletedMusic, error: removeSongError } =
      await MusicService.deleteMusic(musicId, userId);
    if (!deletedMusic) return res.status(404).json({ msg: 'No data found' });
    if (removeSongError) return res.status(500).json({ msg: removeSongError });
    res.status(200).json({ msg: "Music sucessfully deleted!"});
  }
}

module.exports = MusicController;

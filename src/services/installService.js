const UserModel = require('../models/UserModel');
const MusicModel = require('../models/MusicModel');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

class installService {
  static async installDatabase() {
    try {
      await UserModel.sync({ force: true });
      await MusicModel.sync({ force: true });

      const users = [
        { username: 'user-1', password: '123456', isAdmin: false },
        { username: 'user-2', password: '12345', isAdmin: false },
        { username: 'user-3', password: '1234', isAdmin: false },
        { username: 'user-4', password: '3214', isAdmin: false },
        { username: 'adm', password: 'adminadmin', isAdmin: true },
      ];

      for (const user of users) {
        user.password = await hashPassword(user.password);
      }

      await UserModel.bulkCreate(users);

      const musics = await MusicModel.bulkCreate([
        {
          name: 'Billie Jean',
          description: 'Good Michael Jackson Music',
          link: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y&ab_channel=michaeljacksonVEVO',
          userId: 1,
        },
        {
          name: 'Imagine',
          description: 'Classic by John Lennon',
          link: 'https://www.youtube.com/watch?v=YkgkThdzX-8&ab_channel=johnlennon',
          userId: 2,
        },
        {
          name: 'Bohemian Rhapsody',
          description: 'Iconic Queen song',
          link: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ&ab_channel=QueenOfficial',
          userId: 3,
        },
        {
          name: 'Hotel California',
          description: 'Classic by The Eagles',
          link: 'https://www.youtube.com/watch?v=EqPtz5qN7HM&ab_channel=RHINO',
          userId: 4,
        },
        {
          name: 'Stairway to Heaven',
          description: 'Legendary Led Zeppelin track',
          link: 'https://www.youtube.com/watch?v=QkF3oxziUI4&ab_channel=LedZeppelin',
          userId: 1,
        },
        {
          name: 'Smells Like Teen Spirit',
          description: 'Nirvana anthem',
          link: 'https://www.youtube.com/watch?v=hTWKbfoikeg&ab_channel=Nirvana',
          userId: 2,
        },
        {
          name: 'Hey Jude',
          description: 'Classic by The Beatles',
          link: 'https://www.youtube.com/watch?v=A_MjCqQoLLA',
          userId: 3,
        },
        {
          name: 'Like a Rolling Stone',
          description: 'Bob Dylan hit',
          link: 'https://www.youtube.com/watch?v=IwOfCgkyEj0',
          userId: 4,
        },
        {
          name: 'What a Wonderful World',
          description: 'Louis Armstrong classic',
          link: 'https://www.youtube.com/watch?v=CWzrABouyeE',
          userId: 1,
        },
        {
          name: 'No Woman No Cry',
          description: 'Bob Marley anthem',
          link: 'https://www.youtube.com/watch?v=IT8XvzIfiY4',
          userId: 2,
        },
        {
          name: 'Superstition',
          description: 'Stevie Wonder funk classic',
          link: 'https://www.youtube.com/watch?v=0CFuCYNx-1g',
          userId: 3,
        },
        {
          name: "Sweet Child O' Mine",
          description: "Guns N' Roses hit",
          link: 'https://www.youtube.com/watch?v=1w7OgIMMRc4',
          userId: 4,
        },
        {
          name: 'Purple Haze',
          description: 'Jimi Hendrix Experience',
          link: 'https://www.youtube.com/watch?v=fjwWjx7Cw8I',
          userId: 1,
        },
        {
          name: 'Born to Run',
          description: 'Bruce Springsteen hit',
          link: 'https://www.youtube.com/watch?v=IxuThNgl3YA',
          userId: 2,
        },
        {
          name: 'Comfortably Numb',
          description: 'Pink Floyd classic',
          link: 'https://www.youtube.com/watch?v=_FrOQC-zEog',
          userId: 3,
        },
        {
          name: 'Thunderstruck',
          description: 'AC/DC rock anthem',
          link: 'https://www.youtube.com/watch?v=v2AC41dglnM',
          userId: 4,
        },
        {
          name: 'Paint It Black',
          description: 'Rolling Stones classic',
          link: 'https://www.youtube.com/watch?v=O4irXQhgMqg',
          userId: 1,
        },
        {
          name: 'Hallelujah',
          description: 'Leonard Cohen',
          link: 'https://www.youtube.com/watch?v=ttEMYvpoR-k',
          userId: 2,
        },
        {
          name: 'Losing My Religion',
          description: 'R.E.M. classic',
          link: 'https://www.youtube.com/watch?v=xwtdhWltSIg',
          userId: 3,
        },
        {
          name: 'Blackbird',
          description: 'The Beatles acoustic track',
          link: 'https://www.youtube.com/watch?v=Man4Xw8Xypo',
          userId: 4,
        },
      ]);

      return { users, musics };
    } catch (error) {
      throw new Error('Database installation failed: ' + error.message);
    }
  }
}

module.exports = installService;

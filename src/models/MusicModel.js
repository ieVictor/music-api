const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const User = require('./UserModel');

/**
 * @swagger
 * components:
 *   schemas:
 *     Music:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - link
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: number
 *           description: Unique music identifier
 *           example: 1
 *         name:
 *           type: string
 *           description: Name of the music
 *           example: "Billie Jean"
 *         description:
 *           type: string
 *           description: Music description
 *           example: "Michael Jackson classic, released in 1982"
 *         link:
 *           type: string
 *           description: Music link
 *           example: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y"
 *         favorite:
 *           type: boolean
 *           description: If this is one of the favorites musics of the user
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date of creation of the music
 *           example: "2024-03-24T19:34:02.090Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date of last music update
 *           example: "2024-03-24T19:34:02.090Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MusicList:
 *       type: object
 *       properties:
 *         totalMusics:
 *           type: integer
 *           description: Total number of musics
 *           example: 0
 *         totalPages:
 *           type: integer
 *           description: Total number of pages available
 *           example: 0
 *         page:
 *           type: integer
 *           description: Current page number
 *           example: 1
 *         limit:
 *           type: integer
 *           description: Limit of musics per page
 *           example: 5
 *         data:
 *           type: array
 *           description: Array of music objects
 *           items:
 *             $ref: "#/components/schemas/Music"
 *           example: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MusicUpdate:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - link
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the music
 *           example: "Billie Jean"
 *         description:
 *           type: string
 *           description: Music description
 *           example: "Michael Jackson classic, released in 1982"
 *         link:
 *           type: string
 *           description: Music link
 *           example: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y"
 *         favorite:
 *           type: boolean
 *           description: If this is one of the favorites musics of the user
 *           example: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MusicInsert:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - link
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the music
 *           example: "Billie Jean"
 *         description:
 *           type: string
 *           description: Music description
 *           example: "Michael Jackson classic, released in 1982"
 *         link:
 *           type: string
 *           description: Music link
 *           example: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y"
 *         favorite:
 *           type: boolean
 *           description: If this is one of the favorites musics of the user
 *           example: true
 */

const Music = sequelize.define('music', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The name field is mandatory",
      },
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error("The name field must be a string");
        }
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The description field is mandatory",
      },
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error("The description field must be a string");
        }
      }
    }
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The link field is mandatory",
      },
    }
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
});

Music.belongsTo(User, {
  constraints: true,
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE"
})

module.exports = Music;

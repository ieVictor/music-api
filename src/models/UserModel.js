const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - password
 *         - isAdmin
 *       properties:
 *         id:
 *           type: number
 *           description: Unique user identifier
 *           example: 1
 *         username:
 *           type: string
 *           description: Username of the user
 *           example: "john_doe"
 *         password:
 *           type: string
 *           description: Hashed password of the user
 *           example: "$2b$10$zTgR.yZzZpjM7JZf6Afg0uOdD8PS9Cz5g/2A4U2FQnVEMmO5TfAzu"
 *         isAdmin:
 *           type: boolean
 *           description: Indicates whether the user has admin privileges
 *           example: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInformations:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *           example: "john_doe"
 *         musics:
 *           type: object
 *           description: Musics list of the user
 *           items:
 *             $ref: "#/components/schemas/MusicList"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserList:
 *       type: object
 *       properties:
 *         totalMusics:
 *           type: integer
 *           description: Total number of users
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
 *           description: Limit of users per page
 *           example: 5
 *         data:
 *           type: array
 *           description: Array of music objects
 *           items:
 *             $ref: "#/components/schemas/User"
 *           example: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInsert:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username for the new user
 *           example: "john_doe"
 *         password:
 *           type: string
 *           description: Password for the new user
 *           example: "password123"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Updated username for the user
 *           example: "john_doe"
 *         password:
 *           type: string
 *           description: Updated password for the user
 *           example: "newpassword123"
 */

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.beforeCreate(async (user) => {
  const genSalt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, genSalt);
});

module.exports = User;

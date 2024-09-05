const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const User = require('./UserModel');

const Music = sequelize.define('music', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuidv4(),
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

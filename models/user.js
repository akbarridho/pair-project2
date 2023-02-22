'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Like)
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username already used"
      },
      validate: {
        notEmpty: {
          msg: "Username cannot be empty"
        },
        notNull: {
          msg: "Username cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already used"
      },
      validate: {
        notEmpty: {
          msg: "Email cannot be empty"
        },
        notNull: {
          msg: "Email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty"
        },
        notNull: {
          msg: "Password cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "role cannot be empty"
        },
        notNull: {
          msg: "role cannot be empty"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt)

        user.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};